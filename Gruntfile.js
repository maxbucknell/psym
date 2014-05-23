'use strict';


module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: true
      },
      all: [ 'index.js', 'lib/**/*.js']
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          require: 'should'
        },
        src: ['test/**/*.js']
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-mocha-test')

  // Default task.
  grunt.registerTask('lint', ['jshint'])
  grunt.registerTask('test', ['mochaTest'])

  grunt.registerTask('default', ['lint', 'test'])
}
