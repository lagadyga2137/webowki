const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const sequelize = require('sequelize')
const mysql = require('mysql')
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'messages',
    port: 3306
})

conn.connect((err) => {
    if (err) throw err;
    console.log("dziala")
})

app.use(express.json());
app.use( express.static( __dirname));

app.get('/', (req, res) => {
    res.sendFile( path.join( __dirname, 'index.html' ));
})
app.get('/o-nas', (req, res) => {
    res.sendFile( path.join( __dirname, 'o-nas.html' ));
})
app.get('/oferta', (req, res) => {
    res.sendFile( path.join( __dirname, 'oferta.html' ));
})
app.get('/kontakt', (req, res) => {
    res.sendFile( path.join( __dirname, 'kontakt.html' ));
})
app.post('/kontakt', (req, res) => {
    console.log(req.body.imie + "\n" + req.body.nazwisko + "\n" + req.body.email + "\n" + req.body.wiadomosc);
    const {imie, nazwisko, email, wiadomosc} = req.body;
    conn.query('INSERT INTO msg(imie, nazwisko, email, wiadomosc) VALUES(?,?,?,?)',
        [imie, nazwisko, email, wiadomosc], (err, result) => {
        if (err) throw err;
    })
    res.sendFile( path.join( __dirname, 'index.html' ));
});
app.get('/kontakt/get-messages', (req, res) => {
    conn.query('SELECT * FROM msg', (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})
app.get('/kontakt/get-messages/:id', (req, res) => {
    const qId = req.params.id;
    console.log(qId)
    conn.query('SELECT * FROM msg WHERE id=?', [qId], (err, result) => {
        if(err) throw err;
        if(result.length > 0) res.send(result);
        else res.status(404).send("ni ma")
})
})
app.listen(6767, () => {
    console.log('App is not running on http://localhost:3000')
})
