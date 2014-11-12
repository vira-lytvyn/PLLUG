module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
          build: {
            src: 'dev/js/*.js',
            dest: 'build/js/script.min.js'
          }
        }
	});

	grunt.loadNpmTasks('grunt-contrib-scss');
    grunt.registerTask('default', ['uglify']);

    grunt.registerTask('test', ['jasmine', 'qunit', 'silentium']);
	
};