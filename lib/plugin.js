/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-04 02:30:14
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-16 16:07:07
*/

const _ = require('lodash');
const Schema = require('./schema');
const Boom = require('boom');
const pluginName = 'hapi-async-routes';

// This plugin is used to make hapi support handler as async function
function register(server, options, next) {
	const registerAsync = async function () {
		const config = await Schema.validateAsync(options);
		server.handler('asyncHandler', function (route, routeOptions) {
			return function (request, reply) {
				routeOptions.handler(request, reply).catch((err) => {
					if (_.isFunction(config.defaultErrorHandler)) {
						config.defaultErrorHandler(err, request, reply);
					} else {
						reply(Boom.wrap(err, 500));
					}
				});
			};
		});

		const routes = _.map(_.flatten(config.routes, true) || [], (route) => {
			const handler = route.handler || route.config.handler;
			const instance = _.merge({}, route);
			instance.config && delete instance.config.handler;
			delete instance.handler;
			instance.config = instance.config || {};
			instance.config.handler = {
				asyncHandler: {
					handler: handler
				}
			};
			return instance;
		});
		return server.route(routes);
	};

	registerAsync().then(() => {
		next();
	}).catch((error) => {
		server.log(['plugin', 'error', 'fatal', pluginName], error);
		next(error);
	});
}

register.attributes = {
	pkg: require('../package.json')
};

module.exports = {
	register: register
};
