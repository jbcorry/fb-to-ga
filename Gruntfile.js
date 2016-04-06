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
        files: {'<%= globalConfig.dev %>/styles/style.css': '<%= globalConfig.dev %>/scss/style.scss'}
      },
      dist: {
        options: {style: 'expanded'},
        files: {'<%= globalConfig.dev %>/styles/style.css': '<%= globalConfig.dev %>/scss/style.scss'}
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
      dist: {
        expand: true,
        cwd: '<%= globalConfig.dev %>/',
        src: ['*', 'fonts/*', 'styles/images/*', 'styles/fonts/*'],
        dest: '<%= globalConfig.dist %>/',
        filter: 'isFile'
      }
    },

    // Empty build folder
    clean: {
      dist: {
        src: ['<%= globalConfig.dist %>/']
      }
    },

    //autoprefixer: {
    //  options: {
    //    browsers: ['last 2 versions', 'ie 11', '> 5%'],
    //    map: true
    //  },
    //  main: {
    //    expand: false,
    //    flatten: true,
    //    src: '<%= globalConfig.dev %>/styles/style.css',
    //    dest: '<%= globalConfig.dev %>/styles/autoprefixed/style-prefixed.css'
    //  }
    //},

    connect: {
      localserver: {
        port: 9002,
        base: '<%= globalConfig.dist %>'
      }
    },

    //  Renames files for browser caching purposes
    //filerev: {
    //  dist: {
    //    files: {
    //      src: [
    //        '<%= globalConfig.dist %>/scripts/{,*/}*.js',
    //        '<%= globalConfig.dist %>/styles/{,*/}*.css',
    //        '<%= globalConfig.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
    //        '<%= globalConfig.dist %>/fonts/*'
    //      ]
    //    }
    //  }
    //},

    useminPrepare: {
      html: '<%= globalConfig.dev %>/*.html',
      options: {
        dest: '<%= globalConfig.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['concat', 'cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= globalConfig.dist %>/*.html'],
      css: ['<%= globalConfig.dist %>/styles/*.css'],
      options: {
        assetsDirs: ['<%= globalConfig.dist %>']
      }
    }


  }); // END grunt.initConfig

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-connect');
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-usemin');

  // Define Tasks
  grunt.registerTask('build', [
    'clean:dist',
    'sass:dist',
    'useminPrepare',
    'concat:generated',
    'cssmin:generated',
    'uglify:generated',
    //'filerev',
    'copy:dist',
    'usemin'

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