'use strict'
const PORT = 1906 || process.argv[2]

const express = require('express')
const urllib = require('urllib')
const igdb_data = require('./igdb-data.js')(urllib);
const covida_db = require('./covida-db.js')
const services = require('./covida-services.js')(igdb_data, covida_db)
const web_api = require('./covida-web-api')(services)

const app = express()

app.get('/api/', web_api.getMostPopularGames)
app.get('/api/:name/', web_api.getGameByName)
app.get('/api/groups/', web_api.getAllGroups)
app.get('/api/groups/:groupid/', web_api.getGroupInfo)
app.get('/api/groups/:groupid/:total_rating/', web_api.getGamesFromGroupBasedOnRating)
app.post('/api/groups/', web_api.createGroup)
app.put('/api/groups/:id/', web_api.addGameToGroup)
app.put('/api/groups/:id/', web_api.removeGameFromGroup)
app.put('/api/groups/:id/', web_api.updateGroup)

app.listen(PORT)
