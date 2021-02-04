'use strict'
//Aplication running uses port 8080 or specified port
const PORT = process.argv[2] || 8080


const ES_HOST = 'localhost'
const ES_PORT = 9200
const ELASTIC_SEARCH_BASE_URL = `http://${ES_HOST}:${ES_PORT}`


const path = require('path')
const express = require('express')
const fetch = require('node-fetch')
const sitemap = require('express-sitemap-html')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const expressSession = require('express-session')
const method_override = require('method-override')

const userException = require('./userException')
const igdb_data = require('./strorage/igdb-data')(fetch, userException);
const covida_db = require('./strorage/covida-db')(fetch, ELASTIC_SEARCH_BASE_URL, userException)
const user_db = require('./strorage/user-db')(fetch, ELASTIC_SEARCH_BASE_URL)
const services = require('./covida-services')(igdb_data, covida_db, user_db)
const web_api_router = require('./covida-web-api')(services, userException)
const web_site_router = require('./user-interface/covida-web-site')(services)
const user_web_site_router = require('./user-interface/user-web-site')(services)

console.log('All modules loaded')

const app = express()

app.use(cookieParser())
app.use(method_override('_method'))
app.use(expressSession({secret: "Sporting Campeão 2021"}))

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(serializeUser)
passport.deserializeUser(deserializeUser)

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static(path.join(__dirname, 'user-interface', 'public')))


app.set('views', path.join(__dirname, 'user-interface', 'views'))
app.set('view engine', 'hbs')

app.get('/api', apiDesc)
app.get('/', (req, rsp) => rsp.redirect('/site/home'))
app.use('/api', web_api_router)
app.use('/site', VerifyAuthentication, web_site_router)
app.use('/users', user_web_site_router)

function bla(req, rsp) {
    console.log('Oh hi Mark')
}

sitemap.swagger('COVIDA API', app)


app.listen(PORT, '127.0.0.1')
console.log(`App listening on port ${PORT}`)

function apiDesc(req, rsp) {
    console.log(req.path)
    rsp.status(200)
        .json({
            name: 'Chelas Open Videogame Application',
            version: '1.0.0',
            description: 'PI Project Application'
        })
}

function serializeUser(user, done) {
    console.log('serializeUser called')
    console.log(user)
    done(null, {username: user.username})
}

function deserializeUser(user, done) {
    console.log('deserializeUser called')
    console.log(user)
    done(null, user)
}

function VerifyAuthentication(req, rsp, next) {
    if (req.user) return next()
    rsp.redirect(302, '/users/login')
}

console.log('end of server')





