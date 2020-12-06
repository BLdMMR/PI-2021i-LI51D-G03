'use strict'
const PORT = 8080 || process.argv[2]

const express = require('express')
const urllib = require('urllib')
const igdb_data = require('./igdb-data.js')(urllib);
const covida_db = require('./covida-db.js')()
const services = require('./covida-services.js')(igdb_data, covida_db)
const web_api = require('./covida-web-api')(services)

if (process.argv[3] === 'mock') covida_db.loadMock();

const app = express()

app.use(express.json())

app.get('/api', apiDesc)
app.get('/popular', web_api.getMostPopularGames)
app.get('/search/:name', web_api.getGameByName)
app.get('/api/groups', web_api.getAllGroups)
app.get('/api/groups/:id', web_api.getGroupInfo)
app.get('/api/groups/:id/games', web_api.getGamesFromGroupBasedOnRating)
app.post('/api/groups', web_api.createGroup)
app.put('/api/groups/:id/games', web_api.addGameToGroup)
app.delete('/api/groups/:id/games/:gameid', web_api.removeGameFromGroup)
app.put('/api/groups/:id', web_api.updateGroup)

app.listen(PORT)

function apiDesc(req, rsp) {
    console.log(req.path)
    rsp.status(200)
        .json({
            name: 'Chelas Open Videogame Application',
            version: '1.0.0',
            description: 'PI Project Application'
        })
}








