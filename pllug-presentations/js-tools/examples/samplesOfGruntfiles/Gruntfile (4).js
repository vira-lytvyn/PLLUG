module.exports = function(grunt) {

    // =========================
    // Core
    grunt.initConfig({
        
        // Build production js file with all templates precompiled inside.
        // Every mall has its own task for running build process
        // type 'grunt buildAll' command to build core app and all malls at once
        requirejs : {
            compile : {
                options : {
                    baseUrl: "core",
                    name : 'app',
                    mainConfigFile: "core/js/requirejsconfig.js",
                    out : 'core/build/production.js'
                }
            }
        },

        // Run node server for serving mustache templates loading into controllers in non build app
        // Just call 'grunt connect' and open core application at http://0.0.0.0:9001/core/app.html
        connect: {
            server: {
                options: {
                    port: 9001,
                    keepalive : true
                }
            }
        },

        // Compile scss files into css
        sass: {
            core: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'core/style/style.css': 'core/style/scss/style.scss'
                }
            }
        },

        // Run 'grunt watch' to start watching for changings in the scss files
        watch: {
            core: {
                files: 'core/**/*.scss',
                tasks: ['sass:core']
            }
        }
    });

    grunt.registerTask('build', function(){
        grunt.task.run(
            'requirejs:compile',
            'sass:core'
        );
    });


    // =========================
    // Malls

    // Store all mall names here
    var clients = [];

    // read all subdirectories from your orgs folder
    grunt.file.expand("orgs/*").forEach(function (dir) {
        clients.push(dir.split("orgs/")[1])
    });

    // Generate tasks for every client dunamically
    clients.forEach(function(client) {
        
        grunt.config.set('requirejs.compile' + client, {
            options : {
                baseUrl: "core",
                name : '../orgs/' + client + '/js/app',
                // Every mall needs a core-based config and mall-specifig config for requireJS
                mainConfigFile: ['core/js/requirejsconfig.js', 'orgs/' + client + '/js/requirejsconfigMall.js'],
                out : 'orgs/' + client + '/build/production.js'
            }
        });

        grunt.config.set('sass.' + client, {
            options: {
                style: 'expanded'
            },
            files: [{
                src:  'orgs/' + client + '/style/scss/style.scss',
                dest: 'orgs/' + client +'/style/style.css'
            }]
        });

        grunt.config.set('watch.' + client, {
            files: ['core/**/*.scss', 'orgs/' + client + '/**/*.scss'],
            tasks: ['sass:' + client]
        });

        grunt.registerTask('build' + client, ['requirejs:compile' + client, 'sass:' + client]);

    });

    // Run build task for core and all malls
    grunt.registerTask('buildAll', function(){
        grunt.task.run('build');

        clients.forEach(function(client) {
            grunt.task.run('build' + client);
        });
    });


    grunt.loadNpmTasks('can-compile');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', 'build');
};