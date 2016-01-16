/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-15 02:44:14
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-16 21:06:46
*/

module.exports = [
	{
		method: 'GET', path: '/hello', config: {
			handler: {
				async: async function (request, reply) {
					const asyncBye = async function() {
						return 'Hello World!';
					};
					reply(await asyncBye());
				}
			}
		}
	},
	{
		method: 'GET', path: '/bye', config: {
			handler: {
				async: async function (request, reply) {
					const asyncBye = async function() {
						return 'Good Bye!';
					};
					reply(await asyncBye());
				}
			}
		}
	},
	{
		method: 'GET', path: '/error', config: {
			handler: {
				async: async function () {
					throw Error('error');
				}
			}
		}
	}
];
