
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Printer' });
};

exports.file = function(req, res){
  res.render('file', { title: 'Printer' });
};
