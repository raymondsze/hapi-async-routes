/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-15 02:44:14
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-17 22:44:22
*/

module.exports = [
	{
		method: 'GET', path: '/hello', config: {
			handler: {
				async: async function (request, reply) {
					const asyncHello = async function() {
						return 'Hello World!';
					};
					reply(await asyncHello());
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
	}
];
