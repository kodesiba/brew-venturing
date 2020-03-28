const express = require('express')
const app = express()
const port = 4000

app.use('/static', express.static(__dirname + '/static'))
// main page
app.get('/', (req, res) => res.sendFile(__dirname + "/templates/index.html"))
//aps
app.get('/brewerymap', (req, res) => res.sendFile(__dirname + "/templates/imap.html"))
app.get('/yearmap', (req, res) => res.sendFile(__dirname + "/templates/yearmap.html"))
// data table 
app.get('/data', (req, res) => res.sendFile(__dirname + "/templates/dtable.html"))
// brewery selection page
app.get('/breweryselect', (req, res) => res.sendFile(__dirname + "/templates/selbrew.html"))
// history page
app.get('/history', (req, res) => res.sendFile(__dirname + "/templates/history.html"))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))