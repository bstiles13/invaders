var express = require ('express');
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 8080;
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
})

app.listen(PORT, function() {
    console.log('online');
})