var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public_html'));

var config = require('./config');
var port = process.env.PORT || 8000;
var Mod = require('./models/mod');

mongoose.connect(config.database);
app.set('superSecret', config.secret);

app.get('/', function(req, res){
  res.sendFile("index.html");
});

app.get('/api/hw', function(req, res){
 res.send("Hello World!!");
});

app.get('/setup', function(req, res) {
    var mod = new Mod({
        name: 'mohd testing',
        category: 1,
        orbVer: '2016',
        author: 'majid',
        pictureLink: 'http://orbiter.world',
        filename: '',
    });

    mod.save(function(err) {
        if (err) throw err;
        console.log('mod saved successfully');
        res.json({
            success: true
        });
    });
});
app.get('/mod/:id', function(req, res) {
    Mod.findOne({
        id: req.params.id
    }, function(err, mod) {
        if (err) throw err;
        if (!mod) {
            res.json({
                success: false,
                message: 'mod not found'
            });
        } else {
            try {
                res.send(mod);
            } catch (e) {
                res.sendStatus(404);
            }
        }
    });
});

app.get('/mods', function(req, res) {
    Mod.find({}, function(err, mods) {
        if (err) throw err;
        if (!mods) {
            res.json({
                success: false,
                message: 'mods not found'
            });
        } else {
            try {
                res.send(mods);
            } catch (e) {
                res.sendStatus(404);
            }
        }
    });
});

app.listen(port, function(){
   console.log("Your server is started: http://localhost");
});
