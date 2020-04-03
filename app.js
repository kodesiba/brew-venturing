const express = require('express')
const app = express()
const port = 4000

app.use('/static', express.static(__dirname + '/static'))
// main page
app.get('/', (req, res) => res.sendFile(__dirname + "/templates/index.html"))
// map
app.get('/imap', (req, res) => res.sendFile(__dirname + "/templates/imap.html"))
// data table 
app.get('/dtable', (req, res) => res.sendFile(__dirname + "/templates/dtable.html"))
// brewery selection page
// app.get('/selbrew', (req, res) => res.sendFile(__dirname + "/templates/selbrew.html"))
// history page
app.get('/history', (req, res) => res.sendFile(__dirname + "/templates/history.html"))
app.get('/history2', (req, res) => res.sendFile(__dirname + "/templates/history_graph.html"))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))