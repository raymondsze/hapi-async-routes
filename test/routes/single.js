/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-15 02:44:14
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-17 22:44:17
*/

module.exports = {
	method: 'GET', path: '/error', config: {
		handler: {
			async: async function () {
				throw Error('error');
			}
		}
	}
};

