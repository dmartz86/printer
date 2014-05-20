var fs = require('fs');
var util = require('util');
var async = require('async');
var Printer = require('../public/js/config');
var exec = require('child_process').exec;

var FilesTool = {};

FilesTool.getHotfolder = function() {
	Printer.HotFolder = '/';
};

FilesTool.list = function(cb) {
	var filesResult = [];

	if (!Printer.HotFolder || Printer.HotFolder == "") {
		FilesTool.getHotfolder();
	}

	fs.readdir(Printer.HotFolder, function(err, files) {
		if (err) {
			throw err;
		}
		// console.log(files.length);

		async.forEach(files, function(fname, callback) {

			// var fname = files[index];
			var splited = fname.split(".");

			if (splited.length == 1) {
				console.log("Excluding directory: " + "fname");
				callback(false, 'Excluding directory: ');
			} else

			if (!Printer.fileTypes['.' + splited[splited.length - 1]]) {
				console.log("File extension not supported to print: "
						+ splited[splited.length - 1]);
				callback(false, 'File extension not supported to print: ');
			} else {

				fs.exists(Printer.HotFolder + fname, function(exists) {
					if (exists) {
						fs.stat(Printer.HotFolder + fname, function(err,
								stats) {
							if (err) {
								console.log(err);
							}
							// util.inspect(stats);
							console.log("Properties for: " + fname);
							console.log(JSON.stringify(stats) + '\n');
							filesResult.push({
								stats: stats,
								name: fname,
								status: ""
							});
							callback(err, stats);
						});
					} else {
						console.log('File does not exists: '
								+ Printer.HotFolder + fname);
						callback(false, 'File does not exists: ');
					}
				});
			}
		}, function(err, data) {
			if (err) {
				cb({
					error : err
				});
			}
			// Tell the user about the great success
			console.log("Fin_ " + JSON.stringify(filesResult));
			cb(filesResult);
		});
	});
};

/**
 * Prints the file.
 */
FilesTool.print = function(filename, cb) {
	FilesTool.getHotfolder();
	console.log("Request handler 'start' was called.");
	console.log("filename: "+ filename);
	var command = 'notepad /P "' + Printer.HotFolder + filename+'"';
	console.log(command);
	exec(command , function(error, stdout, stderr) {
		cb({error:error, stdout:stdout, stderr:stderr});
	});
};

/**
 * Deletes the file.
 */
FilesTool.remove = function(filename, cb) {
	FilesTool.getHotfolder();
	console.log("filename: "+ filename);
	var command = 'DEL ' + Printer.HotFolder + filename+'';
	console.log(command);
	exec(command , function(error, stdout, stderr) {
		cb({error:error, stdout:stdout, stderr:stderr});
	});
};

module.exports = FilesTool;
