'use strict'
//Aplication running uses port 8080. When testing using mock data can specify port
const PORT = process.argv[3] || 8080

const ES_HOST = 'localhost'
const ES_PORT = 9200
const ELASTIC_SEARCH_BASE_URL = `http://${ES_HOST}:${ES_PORT}`

const express = require('express')
const fetch = require('node-fetch')
const urllib = require('urllib')

const userException = require('./userException')
const igdb_data = require('./strorage/igdb-data')(fetch, urllib, userException);
const covida_db = require('./strorage/covida-db')(fetch, ELASTIC_SEARCH_BASE_URL,userException)
const services = require('./covida-services')(igdb_data, covida_db, userException)
const web_api = require('./covida-web-api')(services, userException)


if (process.argv[2] === 'mock')
    covida_db.loadMock()
        .then(()=>console.log('Mock Data Loaded'))
        .catch(error => console.log(error));

const app = express()

app.use(express.json())


//ROUTER
app.get('/api', apiDesc)
app.get('/popular', web_api.getMostPopularGames)
app.get('/search/:id', web_api.searchGame)
app.get('/api/groups', web_api.getAllGroups)
app.get('/api/groups/:id', web_api.getGroupInfo)
app.get('/api/groups/:id/games', web_api.getGamesFromGroupBasedOnRating)
app.post('/api/groups', web_api.createGroup)
app.delete('/api/groups/:id', web_api.removeGroup)
app.put('/api/groups/:id/games', web_api.addGameToGroup)
app.put('/api/groups/:id/games/:gameid', web_api.removeGameFromGroup)
app.put('/api/groups/:id', web_api.updateGroup)

app.listen(PORT, console.log(`App listening on port ${PORT}`))

function apiDesc(req, rsp) {
    console.log(req.path)
    rsp.status(200)
        .json({
            name: 'Chelas Open Videogame Application',
            version: '1.0.0',
            description: 'PI Project Application'
        })
}








