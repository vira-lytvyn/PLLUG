module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            main: {
                expand: true,
                src: 'dev/*.html',
                dest: 'build/',
                flatten: true
            },
            icons: {
                expand: true,
                cwd: 'dev/img/',
                src: ['**/*.{jpg,png,gif}'],
                dest: 'build/img/'
            }
        },
        concat: {
            script: {
                src: 'dev/js/*.js',
                dest: 'build/js/script.js'
            }
        },
        uglify: {
            compress: {
                src: 'build/js/script.js',
                dest: 'build/js/script.js'
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'build/css/style.css': 'dev/scss/style.scss'
                }
            }
        },
        jshint: {
            gruntfile: ['Gruntfile.js'],
            custom: {
                options: {
                    globals: {
                        jQuery: false,
                        console: false,
                        module: false,
                        document: true
                    }
                },
                files: {
                    src:['dev/js/*.js']
                }
            }
        },
        validation: {
            options: {
                reset: grunt.option('reset') || false,
                stoponerror: false,
                relaxerror: [
                    'Section lacks heading. Consider using h2-h6 elements to add identifying headings to all sections.'
                ],
                path: '/grunt-modules-config/validation-status.json',
                reportpath: '/grunt-modules-config/validation-report.json'
            },
            files: {
                src: ['dev/index.html']
            }
        },
        csslint: {
            main: {
                src: ['build/css/*.css']
            }
        },
        scsslint: {
            modules: [
                'dev/scss/*.scss'
            ],
            options: {
                reporterOutput: 'grunt-modules-config/scss-lint-report.xml',
                colorizeOutput: true,
                config: 'grunt-modules-config/scss-lint-config.yml'
            }
        },
        csscomb: {
            options: {
                config: 'grunt-modules-config/csscomb.json'
            },
            dynamic_mappings: {
                expand: true,
                cwd: 'dev/scss/',
                src: ['*.scss', '!style.scss'],
                dest: 'dev/scss/'
            }
        },
        watch: {
            options: {
                livereload: true
            },
            html: {
                files: ['dev/*.html'],
                tasks: ['validation', 'newer:copy:main']
            },
            scripts: {
                files: ['dev/js/*.js'],
                tasks: ['newer:jshint:custom', 'newer:concat', 'uglify']
            },
            style: {
                files: ['dev/scss/*.scss'],
                tasks: ['newer:csscomb', 'newer:scsslint', 'newer:sass', 'csslint'],
                options: {
                    spawn: false
                }
            },
            images: {
                files: ['dev/img/**/*.{jpg,png,gif}'],
                tasks: ['newer:copy:icons']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-csscomb');
    grunt.loadNpmTasks('grunt-scss-lint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-html-validation');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-newer');

    grunt.registerTask('default', ['validate', 'copy', 'concat', 'uglify', 'sass']);
    grunt.registerTask('validate', ['jshint', 'validation', 'csscomb', 'scsslint', 'csslint']);
};