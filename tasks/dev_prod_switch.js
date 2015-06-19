/*
 * grunt-dev-prod-switch
 * https://github.com/sanusart/grunt-dev-prod-switch
 *
 * Copyright (c) 2013 Sasha Khamkov
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('dev_prod_switch', 'Use to switch between previously defined HTML comment blocks in project files to change environment from development to production and back.', function () {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options();
        var blocking_char = ((options.env_char) ? options.env_char : '#');
        var env_prod = (options.env_block_prod) ? options.env_block_prod : 'env:prod';
        var env_staging = (options.env_block_staging) ? options.env_block_staging : 'env:staging';
        var env_dev = (options.env_block_dev) ? options.env_block_dev : 'env:dev';
        var env_test = (options.env_block_test) ? options.env_block_test : 'env:test';

        // Iterate over all specified files.
        this.files.forEach(function (f) {
            var out = f.src.map(function (src) {
                if (options.environment === 'prod') {
                    var result = grunt.file.read(src, "utf8")
                        .replace(new RegExp("<\!-- " + env_prod + " --" + blocking_char + ">","gi"), "<!-- " + env_prod + " -->")
                        .replace(new RegExp("<\!-- " + env_dev + " -->","gi"), "<!-- " + env_dev + " --" + blocking_char + ">")
                        .replace(new RegExp("<\!-- " + env_test + " -->","gi"), "<!-- " + env_test + " --" + blocking_char + ">")
                        .replace(new RegExp("<\!-- " + env_staging + " -->","gi"), "<!-- " + env_staging + " --" + blocking_char + ">")
                        .replace("/* " + env_prod + " *" + blocking_char+"/", "/* " + env_prod + " */")
                        .replace("/* " + env_dev + " */", "/* " + env_dev + " *" + blocking_char+"/")
                        .replace("/* " + env_test + " */", "/* " + env_test + " *" + blocking_char+"/")
                        .replace("/* " + env_staging + " */", "/* " + env_staging + " *" + blocking_char+"/");
                } else if (options.environment === "staging") {
                    var result = grunt.file.read(src, "utf8")
                        .replace(new RegExp("<\!-- " + env_staging + " --" + blocking_char + ">","gi"), "<!-- " + env_staging + " -->")
                        .replace(new RegExp("<\!-- " + env_dev + " -->","gi"), "<!-- " + env_dev + " --" + blocking_char + ">")
                        .replace(new RegExp("<\!-- " + env_prod + " -->","gi"), "<!-- " + env_prod + " --" + blocking_char + ">")
                        .replace(new RegExp("<\!-- " + env_test + " -->","gi"), "<!-- " + env_test + " --" + blocking_char + ">")
                        .replace("/* " + env_staging + " *" + blocking_char+"/", "/* " + env_staging + " */")
                        .replace("/* " + env_dev + " */", "/* " + env_dev + " *" + blocking_char+"/")
                        .replace("/* " + env_prod + " */", "/* " + env_prod + " *" + blocking_char + "/")
                        .replace("/* " + env_test + " */", "/* " + env_test + " *" + blocking_char + "/");
                } else if (options.environment === "dev") {
                    var result = grunt.file.read(src, "utf8")
                        .replace(new RegExp("<\!-- " + env_dev + " --" + blocking_char + ">","gi"), "<!-- " + env_dev + " -->")
                        .replace(new RegExp("<\!-- " + env_prod + " -->","gi"), "<!-- " + env_prod + " --" + blocking_char + ">")
                        .replace(new RegExp("<\!-- " + env_test + " -->","gi"), "<!-- " + env_test + " --" + blocking_char + ">")
                        .replace(new RegExp("<\!-- " + env_staging + " -->","gi"), "<!-- " + env_staging + " --" + blocking_char + ">")
                        .replace("/* " + env_dev + " *" + blocking_char+"/", "/* " + env_dev + " */")
                        .replace("/* " + env_prod + " */", "/* " + env_prod + " *" + blocking_char + "/")
                        .replace("/* " + env_test + " */", "/* " + env_test + " *" + blocking_char + "/")
                        .replace("/* " + env_staging + " */", "/* " + env_staging + " *" + blocking_char+"/");
                } else if (options.environment === "test") {
                    var result = grunt.file.read(src, "utf8")
                        .replace(new RegExp("<\!-- " + env_test + " --" + blocking_char + ">","gi"), "<!-- " + env_test + " -->")
                        .replace(new RegExp("<\!-- " + env_prod + " -->","gi"), "<!-- " + env_prod + " --" + blocking_char + ">")
                        .replace(new RegExp("<\!-- " + env_dev + " -->","gi"), "<!-- " + env_dev + " --" + blocking_char + ">")
                        .replace(new RegExp("<\!-- " + env_staging + " -->","gi"), "<!-- " + env_staging + " --" + blocking_char + ">")
                        .replace("/* " + env_test + " *" + blocking_char+"/", "/* " + env_test + " */")
                        .replace("/* " + env_prod + " */", "/* " + env_prod + " *" + blocking_char + "/")
                        .replace("/* " + env_dev + " */", "/* " + env_dev + " *" + blocking_char + "/")
                        .replace("/* " + env_staging + " */", "/* " + env_staging + " *" + blocking_char+"/");
                } else {
                    grunt.log.writeln('Please set "environment" in options object.');
                }
                return result;
            });

            var env = 'Test';
            switch(options.environment){
                case 'prod': env = 'Production'; break;
                case 'dev': env = 'Development'; break;
                case 'staging': env = 'Staging'; break;
                default: env = 'Test';
            }
            grunt.log.writeln('Data in file "' + f.dest + '" switched to "' + env + '".');

            grunt.file.write(f.dest, out);
        });

    });
};