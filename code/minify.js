//Check https://github.com/srod/node-minify for more information 
//on how to configure this to your needs

//Currently
//Minify all the files in nonpublic into one big file

var fs = require('fs')
, compressor = require('node-minify');

exports.run = function() {

    //compress all javascript in nonpublic/js folder into one file called js.js
    fs.readdir('./nonpublic/js/', function(err, files) {
	if(err) throw err;
	var jsFiles = [];
	files.forEach(function(file) {
	    console.log(file);
	    jsFiles.push('./nonpublic/js/' + file);
	});
	new compressor.minify({
	    type: 'gcc',
	    fileIn: jsFiles,
	    fileOut: './public/js/js.js',
	    callback: function(err){
		console.log(err);
	    }
	});
    });

    //compress all css in nonpublic/css into single compress css files
    fs.readdir('./nonpublic/css/', function(err, files) {
	if(err) throw err;
	
	files.forEach(function(file) {
	    new compressor.minify({
		type: 'yui-css',
		fileIn: './nonpublic/css/' + file,
		fileOut: './public/css/' + file,
		callback: function(err){
		    console.log(err);
		}
	    });
	});
    });
}();