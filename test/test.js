/*
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-01 02:43:46
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-16 16:12:51
*/

const server = require('./server');
const Lab = require('lab');
const Boom = require('boom');
const Code = require('code');
const lab = Lab.script();
lab.experiment('async handler', function () {
	const pluginOptions = {
		routes: require('./routes'),
		defaultErrorHandler: function (err, request, reply) {
			reply(Boom.wrap(err, 501));
		}
	};

	lab.test('register hapi-async-route', (done) => {
		server.register({
			register: require('../lib'),
			options: pluginOptions
		}, () => {
			server.start(() => {
				server.log(['info'], 'Server started at ' + server.info.uri);
				done();
			});
		});
	});
	lab.test('check server.table', (done) => {
		const table = server.connections[0].table();
		Code.expect(table.length).to.equal(4);
		done();
	});
	lab.test('error', (done) => {
		const options = {
			method: 'GET',
			url: '/error'
		};
		server.inject(options, (res) => {
			Code.expect(res.statusCode).to.equal(501);
			done();
		});
	});
	lab.test('hello', (done) => {
		const options = {
			method: 'GET',
			url: '/hello'
		};
		server.inject(options, (res) => {
			Code.expect(res.payload).to.equal('Hello World!');
			done();
		});
	});
	lab.test('bye', (done) => {
		const options = {
			method: 'GET',
			url: '/bye'
		};
		server.inject(options, (res) => {
			Code.expect(res.payload).to.equal('Good Bye!');
			done();
		});
	});
	lab.test('inline', (done) => {
		const options = {
			method: 'GET',
			url: '/inline'
		};
		server.inject(options, (res) => {
			Code.expect(res.payload).to.equal('inline');
			done();
		});
	});
});

module.exports = lab;
