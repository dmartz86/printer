var FilesTool = require('../tools/files');

exports.list = function(req, res) {
	FilesTool.list(function(results) {
		res.set('Content-Type', 'application/json');
		res.send(200,results);
	});
};

exports.print = function(req, res) {
	console.log(req.params);
	FilesTool.print(req.params.filename, function(results) {
		res.set('Content-Type', 'application/json');
		res.send(200,results);
	});
};


exports.remove = function(req, res) {
	console.log(req.params);
	FilesTool.remove(req.params.filename, function(results) {
		res.set('Content-Type', 'application/json');
		res.send(200,results);
	});
};