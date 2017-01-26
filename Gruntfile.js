module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        loadPath: [
          'node_modules/bootstrap-sass/assets/stylesheets',
          'node_modules/font-awesome/scss'
        ]
      },
      dist: {
        // options: {
        //   style: 'compressed'
        // },
        files: {
          'static/css/app.css': 'static/scss/app.scss'
        }
      }
    },

    copy: {
      init: {
        files: [
          {
            expand: true,
            src: ['node_modules/font-awesome/fonts/*', 'node_modules/bootstrap-sass/assets/fonts/bootstrap/*'],
            dest: 'static/fonts/',
            flatten: true
          }
        ],
      },
      build: {
        files: [
          {
            expand: true,
            cwd: 'static/fonts/',
            src: ['**'],
            dest: 'static_built/fonts/'
          },
          {
            expand: true,
            cwd: 'static/css/',
            src: ['**'],
            dest: 'static_built/css/'
          },
          {
            expand: true,
            cwd: 'static/img/',
            src: ['**'],
            dest: 'static_built/img/'
          },
          {
            expand: true,
            cwd: 'static/js/',
            src: ['**'],
            dest: 'static_built/js/'
          },
        ]
      }
    },

    watch: {
      styles: {
        files: [
          'static/scss/**/*.scss',
        ],
        tasks: ['sass'],
        options: {
          spawn: false,
        },
      },
      scripts: {
        files: [
          'static/js/**/*.js',
        ],
        tasks: ['browserify'],
        options: {
          spawn: false,
        },
      },
    },

    "file-creator": {
      "basic": {
        "django_boilerplate/templates/_version": function(fs, fd, done) {
          fs.writeSync(fd, new Date().getTime());
          done();
        }
      }
    },

    browserify: {
      vendor: {
        src: ['static/js/_app.js'],
        dest: 'static/js/app.js',
      }
    },

    clean: ["static_built"]
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-file-creator');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('build', [
    'clean',
    'copy:init',
    'sass',
    'browserify',
    'copy:build',
    'file-creator'
  ]);

  grunt.registerTask('default', ['watch']);
};