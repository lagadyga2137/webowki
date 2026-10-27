const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));
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
    res.sendFile( path.join( __dirname, 'index.html' ));
});
app.listen(6767, () => {
    console.log('App is not running on http://localhost:3000')
})
