module.exports = function(grunt) {

	grunt.initConfig({
		// Import the project configuration from package.json. The variables set
		// in package.json are used in the banner below. Variables are 
		// referenced via the following syntax:
		// <%= pkg.author.name %>
		pkg: grunt.file.readJSON('package.json'),
		// 
		meta: {
			banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
		    		'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
		    		'<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
		    		'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
		    		' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
		},
		// Task: Concatenate JavaScript
		// The concat task has 2 different targets:
		// 1. libs: libs are the JavaScript libraries. You can build this target
		//          independently via the following command:
		//          grunt concat:libs
		// 2. app:  app contains the JavaScript files that constitute our 
		//          application. You can build this target independently via the 
		//          following command:
		//          grunt concat:app
		concat: {
			libs: {
				src: ['js/libs/bootstrap/bootstrap-transition.js',
				      'js/libs/bootstrap/bootstrap-alert.js'],
		        dest: 'js/min/libs.concat.js'
			},
			app: {
				src: ['<banner:meta.banner>', 
				      'js/app/file-one.js',
				      'js/app/file-two.js'],
		        dest: 'js/min/<%= pkg.name %>.concat-dirty.js'
			}
	    },
	    // Task: Delete all console.log() statements from our app's JavaScript
	    // This task has only one target app, since the JS libraries do not 
	    // contain any console.log() statements. You can build this target
	    // independently via the following command:
	    // grunt removelogging
	    removelogging: {
	    	app: {
	    		src: "js/min/<%= pkg.name %>.concat-dirty.js",
	    	    dest: "js/min/<%= pkg.name %>.concat-clean.js",
	    	}
	    },
	    // Task: Minify JavaScript
	    // The uglify has 2 different targets:
	    // 1. libs: libs are the JavaScript libraries. You can build this target
		//          independently via the following command:
		//          grunt uglify:libs
		// 2. app:  app contains the JavaScript files that constitute our 
		//          application. You can build this target independently via the 
		//          following command:
		//          grunt uglify:app
	    uglify: {
	    	libs: {
	    		src: ['js/min/libs.concat.js'],
	    		dest: 'js/min/libs.min.js'
	    	},
	    	app: {
	    		src: ['<banner:meta.banner>', 
	    		      'js/min/<%= pkg.name %>.concat-clean.js'],
	    		dest: 'js/min/<%= pkg.name %>.min.js'
	        }
	    },
	    // Task: Concatenate and minify CSS
	    // Unlike JavaScript, we're going to combine all CSS into a single file.
	    // Also, this task concatenates and minifies CSS as part of a single
	    // step. Lastly, the syntax of cssmin differs from the other tasks. 
	    // The dest is specified first 'css/min/app.min.css', which is then 
	    // followed by an array of CSS files to include in the task.
	    // You can build this target independently via the following command:
	    // grunt cssmin
	    cssmin: {
	    	compress: {
	    		files: {'css/min/app.min.css': 
	    				    ['css/libs/bootstrap/bootstrap.css',
	    		             'css/libs/bootstrap/bootstrap-responsive.css',
	    		             'css/kreamer.css']
	    		}
	    	}
	    }
	});

	// Load Plugins
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-remove-logging');
	grunt.loadNpmTasks('grunt-contrib-uglify');
		
	// Default task
	// default is run is we only type 'grunt' on the command line, which is 
	// setup below to run all tasks. 
	grunt.registerTask('default', ['concat', 
	                               'removelogging', 
	                               'uglify', 
	                               'cssmin']);

};
