const express = require("express");
const app = express();
const ejs = require('ejs')
const cors = require('cors');
const bodyParser = require('body-parser');


app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000))

app.get('/', function (req, res) {
    res.render('game.ejs');
})

app.listen(app.get('port'), process.env.IP, function () {
    console.log("server started")
});