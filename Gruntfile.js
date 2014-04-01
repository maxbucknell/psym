'use strict'

module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({ jshint: { options: { jshintrc: true }
                             , all: [ 'test/**/*.js'
                                    , 'lib/**/*.js'
                                    ]
                             }
                   , mochaTest: { test: { src: [ 'test/**/*.js' ] } }

                   }
  )

  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-mocha-test')

  // Default task.
  grunt.registerTask('default', ['jshint', 'mochaTest'])
}
