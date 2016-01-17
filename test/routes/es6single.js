/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-15 02:44:14
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-17 22:44:50
*/

export default {
	method: 'GET', path: '/errorES6', config: {
		handler: {
			async: async function () {
				throw Error('error');
			}
		}
	}
};

