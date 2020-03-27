const express = require('express')
const app = express()
const port = 4000
var path = require('path');

app.use('/static', express.static(__dirname + '/static'))
app.get('/brewerymap', (req, res) => res.sendFile(__dirname + "/templates/brewerymap.html"))
app.get('/yearmap', (req, res) => res.sendFile(__dirname + "/templates/yearmap.html"))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))