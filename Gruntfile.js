module.exports = function(grunt) {

  require('time-grunt')(grunt);

  var globalConfig = {
    build: 'build',
    dev: 'assets-dev',
    dist: 'assets-build'
  };

  // Project Configuration
  grunt.initConfig({
    globalConfig: globalConfig,
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
          interrupt: true,
        },
      },
    },

    sass: {
      dev: {
        options: { style: 'expanded' },
        files: { '<%= globalConfig.dist %>/stylesheets/style.css' : '<%= globalConfig.dev %>/scss/style.scss' }
      },
      build: {
        options: { style: 'expanded' },
        files: { '<%= globalConfig.dist %>/stylesheets/style.css' : '<%= globalConfig.dev %>/scss/style.scss' }
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
        dest: '<%= globalConfig.dist %>/scripts/plugins',
      },
      dev: {
        expand: true,
        src: '**',
        cwd: '<%= globalConfig.dev %>/scripts/',
        dest: '<%= globalConfig.dist %>/scripts/',
      },
      build: {
        src: ['**', '!node_modules/**', '!Gruntfile.js', '!package.json', '!assets-dev/**'],
        dest: '<%= globalConfig.build %>/',
      },
    },

    // Empty build folder
    clean: {
        build: {
          src: ['<%= globalConfig.build %>/']
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
        port: 9001,
        base: '/Users/bfbrad/Sites/pave/'
      }
    },

    htmlbuild: {
      src: 'index.html',
      dest: 'dist/',
      options: {
        sections: {
          header: 'includes/layouts/header.html',
          footer: 'includes/layouts/footer.html',
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
  grunt.loadNpmTasks('grunt-html-build');

  // Define Tasks
  grunt.registerTask('build', [
    'sass:build',
    'clean:build',
    'copy:build'
  ]);

  grunt.registerTask('default', [
    'sass:dev',
    'watch'
  ]);

  grunt.registerTask('server', [
    'connect:localserver'
  ]);

};