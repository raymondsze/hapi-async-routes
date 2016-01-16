/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-15 02:44:14
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-16 15:49:05
*/

const controller = require('../controllers/greeting');

module.exports = [
	{method: 'GET', path: '/hello', config: controller.hello},
	{method: 'GET', path: '/bye', config: controller.bye},
	{method: 'GET', path: '/error', config: controller.error},
	{method: 'GET', path: '/inline', handler: async function (request, reply) {
		reply('inline');
	}}
];
