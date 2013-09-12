/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),      
    
    watch: {
      scripts: {
        files: ['portlets/**/*.js','portlets/**/*.css','portlets/**/*.jsp'],
        tasks: ['copy'],
        options: {
          interrupt: true,
        }
      }
    },

   clean :{
    files: ['/home/sanjayc/Leantaas/dev-tools/tomcat-csr/webapps/csr-portlet/**/* '],
    options:{ force : true }
  },

   copy : {
      portlets : {
        files : [
          { expand: 'true', cwd: 'portlets/csr-portlet/docroot/', src : ['**'], dest : '/home/sanjayc/Leantaas/dev-tools/tomcat-csr/temp/0-csr-portlet/' },
          { expand: 'true', cwd: 'portlets/csr-portlet/docroot/', src : ['**'], dest : '/home/sanjayc/Leantaas/dev-tools/tomcat-csr/webapps/csr-portlet/' }
        ]
      }
    },

  shell: {
        stop : {
            options :{ stdout: true},
            command : 'ant stop'
        },                                
        deploy: {                      
            options: { stdout: true },
            command: 'ant _all debug'
        }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task.
  grunt.registerTask('default', ['deploy']);
  grunt.registerTask('clean-portlets',['clean']);
  grunt.registerTask('copy-portlets',['copy']);
  grunt.registerTask('deploy',['shell:deploy']);
  grunt.registerTask('stop',['shell:stop']);
};
