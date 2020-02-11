var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var url='mongodb://localhost:27017/'; // url for MongoDB
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Home page" });
});
router.post('/submit',function(req,res,next){
  MongoClient.connect(url, function(err, db){
    if (err) throw err;
    var dbo = db.db("shophuyka");
    var obj = {"username":"user","password":"1324"};
    dbo.collection("users").insertOne(obj,function(err,result){
      console.log(result);
      res.redirect('/');
    })
  })
})
module.exports = router;
