/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-15 02:44:14
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-16 15:49:40
*/

module.exports = {
	hello: {
		handler: async function (request, reply) {
			const asyncHelloWorld = async function() {
				return 'Hello World!';
			};
			reply(await asyncHelloWorld());
		}
	},
	bye: {
		handler: async function (request, reply) {
			const asyncBye = async function() {
				return 'Good Bye!';
			};
			reply(await asyncBye());
		}
	},
	error: {
		handler: async function () {
			throw Error('error');
		}
	}
};
