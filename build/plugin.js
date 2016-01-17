'use strict';

/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-04 02:30:14
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-17 22:18:22
*/

const _ = require('lodash');
const path = require('path');
const Schema = require('./schema');
const importDirectory = require('import-directory');

// This plugin is used to make hapi support handler as async function
function register(server, options, next) {
	Schema.validate(options, function (error, config) {
		if (error) {
			next(error);
		} else {
			// register a new type handler: asyncHandler
			server.handler(config.handlerName, function (route, asyncHandler) {
				return function (request, reply) {
					// call the handler, the handler should be async function return Promise object
					asyncHandler(request, reply).catch(err => {
						// use the defaultErrorhandler is defined
						if (_.isFunction(config.defaultErrorHandler)) {
							config.defaultErrorHandler(err, request, reply);
						} else {
							reply(err).code(500);
						}
					});
				};
			});

			const dirs = config.routes;
			_.each(dirs, dir => {
				const relativePath = path.relative(__dirname, process.cwd() + '/' + dir);
				importDirectory(module, relativePath, {
					visit: function visit(obj) {
						if (!_.isUndefined(obj)) {
							let routes = _.isArray(obj) ? obj : [obj];
							_.each(routes, route => {
								server.route(route);
							});
						}
					}
				});
			});
			next();
		}
	});
}

register.attributes = {
	pkg: require('../package.json')
};

module.exports = {
	register: register
};
