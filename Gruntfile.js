module.exports = function (grunt) {

  require('time-grunt')(grunt);

  // Project Configuration
  grunt.initConfig({
    globalConfig: {
      dev: 'dev',
      dist: 'dist'
    },
    fixturesPath: "includes",
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      sass: {
        files: '<%= globalConfig.dev %>/scss/**/**/*.scss',
        tasks: 'sass:dev'
      },

      scripts: {
        files: '<%= globalConfig.dev %>/scripts/**',
        tasks: 'copy:dev',
        options: {
          interrupt: true
        }
      }
    },

    sass: {
      dev: {
        options: {style: 'expanded'},
        files: {'<%= globalConfig.dev %>/stylesheets/style.css': '<%= globalConfig.dev %>/scss/style.scss'}
      },
      dist: {
        options: {style: 'expanded'},
        files: {'<%= globalConfig.dev %>/stylesheets/style.css': '<%= globalConfig.dev %>/scss/style.scss'}
      }
    },

    jshint: {
      options: {
        asi: false
      },
      all: ['<%= globalConfig.dev %>/scripts/**/*.js']
    },

    // Copy to build folder
    copy: {
      js: {
        expand: true,
        src: '**',
        cwd: '<%= globalConfig.dev %>/scripts/plugins',
        dest: '<%= globalConfig.dist %>/scripts/plugins'
      },
      dist: {
        src: ['<%= globalConfig.dev %>/', '!scss/**'],
        dest: '<%= globalConfig.dist %>/'
      }
    },

    // Empty build folder
    clean: {
      dist: {
        src: ['<%= globalConfig.dist %>/']
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 11', '> 5%'],
        map: true
      },
      main: {
        expand: false,
        flatten: true,
        src: '<%= globalConfig.dev %>/stylesheets/style.css',
        dest: '<%= globalConfig.dev %>/stylesheets/autoprefixed/style-prefixed.css'
      }
    },

    connect: {
      localserver: {
        port: 9002,
        base: '<%= globalConfig.dist %>'
      }
    },

    htmlbuild: {
      dist: {
        src: '<%= globalConfig.dev %>/*.html',
        dest: '<%= globalConfig.dist %>',
        options: {
          scripts: {
            bundle: [
              '<%= fixturesPath %>/scripts/*.js'
            ]
          }
        }
      }
    }

  }); // END grunt.initConfig

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-connect');
  grunt.loadNpmTasks('grunt-usemin');

  // Define Tasks
  grunt.registerTask('build', [
    'clean:dist',
    'sass:dist',

    'useminPrepare',
    'concat:generated',
    'cssmin:generated',
    'uglify:generated',
    'filerev',
    'usemin'

    //'copy:dist'
  ]);

  grunt.registerTask('default', [
    'sass:dev'
    // 'watch'
  ]);

  grunt.registerTask('server', [
    'build',
    'connect:localserver'
  ]);

};