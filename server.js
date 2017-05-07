var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/chat';

app.use(bodyParser.json());

app.get('/messages', function (req, res) {
  MongoClient.connect(url, function(err, db) {
    var messages = db.collection('messages');
    var data = messages.find().toArray(function(error, results) {
      if (error) {
        console.log('Error finding messages in DB', error); //todo delete
        res.status(400).send('Error getting messages');
      } else {
        res.status(200).send(results);
      }
    });
  });
});

app.post('/message', function (req, res) {
  MongoClient.connect(url, function(err, db) {
    var messages = db.collection('messages');
    var data = req.body;
    messages.insert(data, function(error, results) {
      if (error) {
        console.log('Error adding data to DB', error);
      } else {
        res.status(201).send();
      }
    });
  });
});

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
  res.redirect('/');
});

app.listen(3000, function() {
  console.log('Server Running');
});
