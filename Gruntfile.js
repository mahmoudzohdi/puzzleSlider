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
				files: ['assets/scss/*.scss'],
				tasks: ['sass'],
				
			},
			html: {
				files: ['*.pug'],
				tasks: ['pug'],
			 	
			},
			js: {
				files: ['assets/js/*.js'],
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
					'assets/css/styles.css' : 'assets/scss/styles.scss',
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
    		src: ['assets/js/puzzleSlider.js', 'assets/js/main.js']
		},

		uglify: {
		    min: {
		      files: {
		        'dist/puzzleSlider.min.js': ['assets/js/puzzleSlider.js']
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