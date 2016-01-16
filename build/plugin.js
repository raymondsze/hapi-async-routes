'use strict';

/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-04 02:30:14
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-16 21:05:55
*/

const _ = require('lodash');
const Fs = require('fs');
const Schema = require('./schema');

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
			const promises = _.map(dirs, dir => {
				return new Promise((resolve, reject) => {
					Fs.readdir(process.cwd() + '/' + dir, (err, fileList) => {
						if (err) {
							reject(err);
						} else {
							const routes = _.map(fileList, file => {
								const path = process.cwd() + '/' + dir + '/' + file;
								return require(path);
							});
							resolve(_.flatten(routes));
						}
					});
				});
			});
			Promise.all(promises).then(routes => {
				_.each(routes, route => {
					server.route(route);
				});
				next();
			}).catch(err => {
				next(err);
			});
		}
	});
}

register.attributes = {
	pkg: require('../package.json')
};

module.exports = {
	register: register
};
