var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/'; // url for MongoDBnpm
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    MongoClient.connect(url, (err, db) => {
        var dbo = db.db('shophuyka');

        dbo.collection('items').find({}).sort({view:-1}).toArray((err, result) => {

            res.render('index', {
                title: "Home page",
                items: result
            });
        })
    })

});
// Get page add item
router.get('/additem', (req, res, next) => {
    res.render('additem', {

    })
})
// Get page update item
router.get('/updateitem', (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        var dbo = db.db('shophuyka');
        var id = new ObjectID(req.query.id);
        var obj = { _id: id };
        dbo.collection('items').find(obj).toArray((err, result) => {
            res.render('update', {
                items: result
            })
        })
    })
})
// Handle post add item
router.post('/additem', function (req, res, next) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("shophuyka");
        var name = req.body.name;
        var price = req.body.price;
        var quantity = req.body.quantity;
        var url = req.body.url;
        var des = req.body.des;

        var obj = { "name": name, 'price': price, 'quantity': quantity, 'url': url, 'des': des };
        dbo.collection("items").insertOne(obj, function (err, result) {

            res.redirect('/');
        });
    })
})
// Handle post delete item
router.post('/delete', (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db('shophuyka');
        var id = new ObjectID(req.query.id);
        var obj = { _id: id };
        dbo.collection('items').deleteOne(obj, (err, result) => {
            res.redirect('/');
        });
    })
})
// Handle post update item
router.post('/updateitem', (req, res, next) => {
    var id = new ObjectID(req.body.itemID);
    var name = req.body.name;
    var price = req.body.price;
    var quantity = req.body.quantity;
    var urlImage = req.body.urlImage;
    var des = req.body.des;

    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db('shophuyka');
        var query = { _id: id };
        var obj = {
            $set: {
                name: name,
                price: price,
                quantity: quantity,
                url: urlImage,
                des: des
            }
        };
        dbo.collection('items').update(query, obj, (err, result) => {
            console.log("1 item is updated.");
            res.redirect('/');
        })
    })
})
module.exports = router;
