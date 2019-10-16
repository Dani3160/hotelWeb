var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/project', {useNewUrlParser: true, useUnifiedTopology: true});

var Schema = mongoose.Schema;

const User = mongoose.model('users', {
  nama: String,
  email: String,
});

// Hotel

var hotelSchema = new Schema({
    nama: String,
    alamat: String,
    kontak: String,
}, {collection: 'hotel'});

var hotelData = mongoose.model('hotelData', hotelSchema);

// End Hotel

// Kamar

var kamarSchema = new Schema({
    nomor: String,
	jmlKasur: String,
    fasilitas: [String],
    harga: String,
}, {collection: 'kamar'});

var kamarData = mongoose.model('kamarData', kamarSchema);

// End Kamar

/* GET home page. */

router.get('/', function(req, res, next) {
    
    let data = {
        layout: 'mainAdmin',
        title: 'Selamat Datang',
    };
    res.render('admin/index', data);
});


// --------------------

// Informasi Hotel

// GetAll

router.get('/informasi-hotel', (req, res) => {
    hotelData.find((err, docs) => {
        let data = {
            layout: 'mainAdmin',
            title: 'Informasi Hotel',
            list: docs
        };

        if(!err){
            res.render('admin/hotel', data);
        }else{
            alert("Error Bos!" + err);
        }

    });
});

// End GetAll

// Function Post Data dam Update Data

function insertHotel(req, res){
    var item = {
        nama: req.body.nama,
        alamat: req.body.alamat,
        kontak: req.body.kontak
    };

    var data = new hotelData(item);
    data.save();
    res.redirect('/admin/informasi-hotel');
}

function updateHotel(req, res){
    hotelData.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err){
            res.redirect('/admin/informasi-hotel');
        }else{
            alert("Error" + err);
        }
    });
}

// End Function

// Post Data dan Update Data

router.post('/insert/hotel', (req, res) => {
    if(req.body._id == ''){
        insertHotel(req, res);
    }else{
        updateHotel(req, res);
    }
});

// End Post Data dan Update Data

// Get Data By ID
router.get('/informasi-hotel/:id', (req, res) => {
    hotelData.findById(req.params.id, (err, doc) => {
        let data = {
            layout: 'mainAdmin',
            title: 'Informasi Hotel',
            value: doc
        };
        if(!err){
            res.render('admin/addHotel', data);
        }
    });
});
// End Get Data By ID

// Hapus Data
router.get('/delete/hotel/:id', (req, res) => {
    hotelData.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err){
            res.redirect('/admin/informasi-hotel');
        }else{
            alert("Error" + err);
        }
    });
});
// End Hapus Data


// End Informasi Hotel

// -------------------------------------------


// Informasi Kamar Hotel


// Get Data All

router.get('/informasi-kamar', (req, res) => {
    
    kamarData.find((err, docs) => {

        hotelData.find((err, doc) => {

        let data = {
            layout: 'mainAdmin',
            title: 'Informasi Kamar',
            list: docs,
            item: doc
        };

        if(!err){
            res.render('admin/room', data);
        }else{
            alert("Error Bos!" + err);
        }
    });

    }); 
});

// End Data Get Data All


// Function Post Data dan Update Data
    function insertKamar(req, res){
        var item = {
            nomor: req.body.nomor,
            jmlKasur: req.body.jmlKasur,
            fasilitas: req.body.fasilitas,
            harga: req.body.harga,
        };
    
        var data = new kamarData(item);
        data.save();
        res.redirect('/admin/informasi-kamar');
    }

    function updateKamar(req,res){
        kamarData.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
            if(!err){
                res.redirect('/admin/informasi-kamar');
            }else{
                alert("Error" + err);
            }
        });
    }
// End Function Post Data dan Update Data



// Post Data dan Update Data

router.post('/insert', (req, res) => {
    if(req.body._id == ''){
        insertKamar(req, res);
    }else{
        updateKamar(req, res);
    }
});

// End Post dan Update Data


// Get Data By ID

router.get('/informasi-kamar/:id', (req, res) => {
    kamarData.findById(req.params.id, (err, doc) => {
        let data = {
            layout: 'mainAdmin',
            title: 'Informasi Kamar',
            value: doc
        };
        if(!err){
            res.render('admin/addRoom', data);
        }
    });
});

// End Get Data By ID

// Hapus Data
router.get('/delete/:id', (req, res) => {
    kamarData.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err){
            res.redirect('/admin/informasi-kamar');
        }else{
            alert("Error" + err);
        }
    });
});
// End Hapus Data

// End Informasi Kamar Hotel

router.get('/logout', function(req, res, next) {
    res.redirect('/');
});


module.exports = router;