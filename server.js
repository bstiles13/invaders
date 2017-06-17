var express = require ('express');
var bodyParser = require('body-parser');

var port = 8080;
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
})

app.listen(port, function() {
    console.log('online');
})