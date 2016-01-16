/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-16 17:58:34
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-16 21:07:49
*/

module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);
	grunt.initConfig({
		babel: {
			options: {
				presets: ['es2015-node5', 'stage-0']
			},
			dist: {
				files: [
					{
						expand: true,
						cwd: 'lib/',
						src: ['*.js'],
						dest: 'build/'
					}
				]
			}
		}
	});

	grunt.registerTask('default', ['babel']);
};
