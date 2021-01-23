'use strict'
//Aplication running uses port 8080. When testing using mock data can specify port
const PORT = process.argv[3] || 8080

const ES_HOST = 'localhost'
const ES_PORT = 9200
const ELASTIC_SEARCH_BASE_URL = `http://${ES_HOST}:${ES_PORT}`

const path = require('path')
const express = require('express')
const fetch = require('node-fetch')
const sitemap = require('express-sitemap-html')
const router = express.Router()

const userException = require('./userException')
const igdb_data = require('./strorage/igdb-data')(fetch, userException);
const covida_db = require('./strorage/covida-db')(fetch, ELASTIC_SEARCH_BASE_URL,userException)
const services = require('./covida-services')(igdb_data, covida_db, userException)
const web_api = require('./covida-web-api')(services, userException, router)
const web_site = require('./user-interface/covida-web-site')(services, router)

if (process.argv[2] === 'mock')
    covida_db.loadMock()
        .then(()=>console.log('Mock Data Loaded'))
        .catch(error => console.log(error));

const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static(path.join(__dirname, 'user-interface', 'public')))

app.set('views', path.join(__dirname, './user-interface', 'views'))
app.set('view engine', 'hbs')

app.get('/api', apiDesc)
app.use('/api', web_api)
app.use('/site', web_site)

sitemap.swagger('COVIDA API', app)


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

function MyVerify(req, rsp) {
    console.log('called')
    rsp.redirect('/site/groups')
}







