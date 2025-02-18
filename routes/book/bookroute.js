var express = require('express');
var router = express.Router();
const bookcontroller = require('../../controllers/bookcontroller');
/* GET home page. */
router.get('/', async(req, res, next)=>{
  res.send({message: "this is homeroutes of book"});
});
// router.get('/addbook', function(req, res, next) {
//     res.render('form/addbook');
//   });

router.post('/add-book',bookcontroller.addbook);


router.get('/show-book',bookcontroller.showbook);

router.post('/updatebookpage',bookcontroller.updatebookpage);

router.post('/update',bookcontroller.updatebook);

router.post('/deletepage',bookcontroller.deletepage);

router.post('/delete',bookcontroller.deletebook);


module.exports = router;
