/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-15 02:40:52
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-15 03:05:17
*/

const _ = require('lodash');
const requireDirectory = require('require-directory');
module.exports = _.map(requireDirectory(module, (route) => route));
