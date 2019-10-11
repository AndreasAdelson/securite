const express = require('express')
const app = express()
var path = require('path');
var bodyParser = require("body-parser");
const mariadb = require('mariadb');
const pool = mariadb.createPool({host: '10.0.2.2', user: 'appliRW1', password: 'nodejs1', connectionLimit: 5, database: "securite", port: 3307});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'))
});

app.post('/',async function(req, res) {
    var nom = req.body.nom;
    var prenom = req.body.prenom;
    var date_naissance = req.body.date_naissance;
    var email = req.body.email;
    var adresse = req.body.adresse;
    var telephone = req.body.telephone;
    let conn;
    try {
        console.log('etablishing connection');
        conn = await pool.getConnection();
        console.log('established');
        conn.query("INSERT INTO data_user (nom, prenom, date_de_naissance, mail, telephone, adresse) value (?, ?, ?, ?, ?, ?)", [nom, prenom, date_naissance, email, telephone, adresse])
    } catch (err) {
        console.log(err)
        throw err;
    }
    res.sendFile(path.join(__dirname + '/index.html'))
});

app.listen(4000, function () {
  console.log('Example app listening on port 4000!')
});