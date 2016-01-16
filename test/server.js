/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-15 02:51:20
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-16 15:50:37
*/

const Hapi = require('hapi');
const server = new Hapi.Server();
server.connection({host: 'localhost', port: '3000'});

module.exports = server;
