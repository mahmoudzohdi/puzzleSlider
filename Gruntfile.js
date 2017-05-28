module.exports = function(grunt){
	grunt.initConfig({	
		
		pkg: grunt.file.readJSON('package.json'),

		

		watch: {
			options: {
		      livereload: 9000,
		    },
			gruntFileChange: {
				files: 'Gruntfile.js',
				tasks: ['sass', 'pug', 'uglify']
			},
			css: {
				files: ['scss/*.scss'],
				tasks: ['sass'],
				
			},
			html: {
				files: ['*.pug'],
				tasks: ['pug'],
			 	
			},
			js: {
				files: ['js/*.js'],
				tasks: ['jshint', 'uglify'],
			}
		},

		sass: {
			src: {
				options: {
					style: 'expanded',
					noCache: true,
				},

				files: {
					'css/styles.css' : 'scss/styles.scss',
				},
			},
		},

		pug: {
			src: {
			    options: {
					pretty: true,
				},
			    files: {
					'index.html': ['index.pug'],
				}
			  }
		},
		jshint: {
    		src: ['js/puzzleSlider.js', 'js/main.js']
		},

		uglify: {
		    min: {
		      files: {
		        'dist/puzzleSlider.min.js': ['js/puzzleSlider.js']
		      }
		    }
		}
	});

	// PLUGINS
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-pug');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	

	// Load Tasks
	grunt.registerTask('default', ["watch"]);

	
};