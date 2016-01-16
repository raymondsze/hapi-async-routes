/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-03 21:52:13
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-16 15:46:30
*/

const Promise = require('bluebird');
const Joi = require('joi');

module.exports = Promise.promisifyAll(Joi.object({
	routes: Joi.array().items([Joi.object(), Joi.array()]).default([]).optional(),
	defaultErrorHandler: Joi.func().optional()
}));
