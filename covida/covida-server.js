'use strict'
const PORT = 1906 || process.argv[2]

const express = require('express')
const web_api = require('./covida-web-api')

const app = express()

app.get('/api/', web_api.getMostPopularGames)
app.get('/api/:name', web_api.getGameByName)
app.get('/api/groups/', web_api.getAllGroups)
app.get('/api/groups/:groupid/', web_api.getGroupInfo)
app.get('/api/groups/:groupid/:total_rating/', web_api.getGamesFromGroupBasedOnRating)
app.post('/api/groups/', web_api.createGroup)
app.put('/api/groups/:id/', web_api.addGameToGroup)
app.put('/api/groups/:id/', web_api.removeGameFromGroup)
app.put('/api/groups/:id/', web_api.updateGroup)

app.listen(PORT)
