module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                cwd: 'dev/', 
                src: ['index.html', 'baseStyleView.html'], 
                dest: 'build/', 
                expand: true
            },

            vendor: {
                cwd: 'dev/js/vendor', 
                src: '**', 
                dest: 'build/js/vendor', 
                expand: true,
            },

            icons: {
                cwd: 'dev/img', 
                src: '**', 
                dest: 'build/img', 
                expand: true
            }
        },

        concat: {
            options: {
                separator: ';',
            },

            apps: {
                src: ['dev/js/apps/*.js'],
                dest: 'build/js/script.js',
            },
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

                files: [{
                    expand: true,
                    cwd: 'dev/scss',
                    src: ['style.scss'],
                    dest: 'build/css',
                    ext: '.css'
                }]
            }
        },

        insert: {
            options: {},
            main: {
                files: [
                    {
                        src: "dev/templates/_main.html", 
                        dest: "build/index.html", 
                        match: "<!-- Stuff mainPage here -->"
                    },
                    {
                        src: "dev/templates/_aside-content.html", 
                        dest: "build/index.html", 
                        match: "<!--Stuff aside content here-->"
                    },
                    {
                        src: "dev/templates/_dashboard.html", 
                        dest: "build/index.html", 
                        match: "<!--Stuff dashboard here-->"
                    },
                    {
                        src: "dev/templates/_events.html", 
                        dest: "build/index.html", 
                        match: "<!--Stuff events here-->"
                    },
                    {
                        src: "dev/templates/_friends.html", 
                        dest: "build/index.html", 
                        match: "<!--Stuff friends here-->"
                    },
                    {
                        src: "dev/templates/_map.html", 
                        dest: "build/index.html", 
                        match: "<!--Stuff map here-->"
                    },
                    {
                        src: "dev/templates/_messanger.html", 
                        dest: "build/index.html", 
                        match: "<!--Stuff messanger here-->"
                    },
                    {
                        src: "dev/templates/_profile.html", 
                        dest: "build/index.html", 
                        match: "<!--Stuff profile here-->"
                    },
                    {
                        src: "dev/templates/_register.html", 
                        dest: "build/index.html", 
                        match: "<!--Stuff register here-->"
                    },
                    {
                        src: "dev/templates/_login.html", 
                        dest: "build/index.html", 
                        match: "<!--Stuff login here-->"
                    },
                    {
                        src: "dev/templates/_header.html", 
                        dest: "build/index.html", 
                        match: "<!--Stuff header here-->"
                    },
                ],
            },
        },

        jshint: {
            files: {
                src:['Gruntfile.js', 'dev/js/apps/*.js']
            }
        },

        validation: {
            options: {                
                stoponerror: false,
                relaxerror: [
                    'Section lacks heading. Consider using h2-h6 elements to add identifying headings to all sections.'
                ],
                path: '/grunt-modules-config/validation-status.json',
                reportpath: '/grunt-modules-config/validation-report.json'
            },
            files: {
                src: ['dev/*.html', 'dev/templates/*.html']
            }
        },

        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
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

        autoprefixer: {     
            options: {
                browsers: ['> 1%', 'last 4 versions', 'Firefox ESR', 'Opera 12.1']
            }, 
            dist: {
                files:{
                    'build/css/style.css': 'build/css/style.css'
                }
            }               
        },

        watch: {
            html: {
                files: ['dev/**/*.html'],
                tasks: ['copy:main', 'insert'],
            },

            js: {
                files: ['dev/js/apps/*.js'],
                tasks: ['newer:jshint', 'concat', 'uglify'],
            },

            libraries: {
                files: ['dev/js/vendor/*.js'],
                tasks: ['newer:copy:vendor'],
            },

            styles: {
                files: ['dev/scss/*.scss'],
                tasks: ['newer:csscomb', 'newer:scsslint', 'sass', 'autoprefixer', 'csslint'],
                // tasks: ['newer:csscomb', 'newer:scsslint', 'sass', 'autoprefixer', 'csslint'],
                options: {
                    spawn: false
                }
            },

            images: {
                files: ['dev/img/**/*.{jpg,png,gif,svg}'],
                tasks: ['newer:copy:icons']
            }
        }

      });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-insert');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-csscomb');
    grunt.loadNpmTasks('grunt-scss-lint');
    grunt.loadNpmTasks('grunt-contrib-csslint');    
    grunt.loadNpmTasks('grunt-html-validation');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-autoprefixer');
    
    grunt.registerTask('default', ['copy', 'concat', 'uglify', 'insert', 'sass', 'autoprefixer']);
    grunt.registerTask('validate', ['validation', 'jshint', 'csscomb', 'scsslint', 'csslint']);
};

