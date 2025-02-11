var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'LIBRRY MANAGEMENT SYSTEM' });
});

router.get('/addbook', function(req, res, next) {
  res.render('form/addbook', { title: 'ADD BOOK : ' });
});
router.get('/showbook', function(req, res, next) {
  res.render('form/showbook', { title: 'SHOW BOOK: ' });
});



module.exports = router;
