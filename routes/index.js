var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/project', {useNewUrlParser: true, useUnifiedTopology: true});

var Schema = mongoose.Schema;

// User

var userSchema = new Schema({
    nama: String,
    email: String,
    pass: String,
}, {collection: 'user'});

var userData = mongoose.model('userData', userSchema);

// End User


// Hotel

var hotelS = new Schema({
    nama: String,
    alamat: String,
    kontak: String,
}, {collection: 'hotel'});

var hotelD = mongoose.model('hotelD', hotelS);

// End Hotel

// Kamar

var kamarS = new Schema({
    nomor: String,
		jmlKasur: String,
    fasilitas: [String],
    harga: String,
}, {collection: 'kamar'});


var kamarD = mongoose.model('kamarD', kamarS);

// End Kamar

// Login

router.get('/login', function(req, res, next){
    let data = {
        layout: 'mainLogin',
        title: 'Sign In',
    };
    res.render('login', data);
});

router.post('/login', function(req, res, next) {
  let data = req.body;
  
  userData.find({
    email: data.email
  }, function (err, docs) {
    if (docs[0].password === data.pass) {
      res.redirect('/admin');
    } else {
      res.redirect('/login');
    }
  });
});

// End Login

// Register

router.get('/registrasi', function(req, res, next){
    let data = {
        layout: 'mainLogin',
        title: 'Sign Up',
    };
    res.render('register', data);
});

function insertUser(req, res){
    var item = {
        nama: req.body.nama,
        email: req.body.email,
        pass: req.body.password
    };

    var data = new userData(item);
    data.save();
    res.redirect('/admin');
}

router.post('/registrasi', (req, res) => {
    if(req.body._id == ''){
        insertUser(req, res);
    }else{
        console.log("Error");
    }
});

// End Register

/* GET home page. */
router.get('/', function(req, res, next) {
 
 hotelD.find((err, docs) => {
 	
 	kamarD.find((err, doc) => {
 		if(!err){
 		res.render('index', {
 			list: docs,
 			item: doc
 		});
	 	}else{
	 		alert("Error Jang!" + err);
	 	}
 	});
 	
 });

});


router.get('/informasi-kamar/:id', function(req, res, next){
	kamarD.findById(req.params.id, (err, resKamar) => {
		 	let data = {
            layout: 'frontend',
            title: 'Informasi Kamar',
            item: resKamar
        };

        if(!err){
            res.render('info', data);
        }
	});
});

module.exports = router;