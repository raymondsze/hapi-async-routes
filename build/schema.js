'use strict';

/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-03 21:52:13
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-16 20:20:49
*/

const Joi = require('joi');

module.exports = Joi.object({
	handlerName: Joi.string().default('async').optional(),
	routes: Joi.array().items(Joi.string()).default([]).optional(),
	defaultErrorHandler: Joi.func().optional()
});
