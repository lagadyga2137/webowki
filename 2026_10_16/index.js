const express = require('express')
const app = express()
const mime = require('mime-types')


app.get('/', (req, res) => {
  res.send('aaaa')
})
app.get('/syf', (req, res) => {
  res.json({"xd": "xddd"})
})
app.get('/html', (req, res) => {
  res.send("<h1>676767</h1>")
})
app.get('/get-params', (req, res) => {
  res.json({"ok": "ok"})
})
app.get('*', (req, res) => {
  const type = mime.lookup(req.path)

  if (type !== false) {
    res.status(200).type('text/plain').send(type)
  } else {
    res.status(404).type('text/plain').send('nie dziala')
  }
})
app.listen(6767, () => {
  console.log('App is not running on http://localhost:3000')
})
