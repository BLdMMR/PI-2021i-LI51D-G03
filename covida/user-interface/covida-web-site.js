'use strict'
const express = require('express')
const router = express.Router()

module.exports = function(services) {

      if (!services) {
            throw 'No services module found'
      }

      let currGroups = []

      router.get('/home', loadHomePage)
      router.get('/popular', getMostPopularGames)
      router.get('/search', searchGame)
      router.get('/games/:id', getGameDetails)
      router.get('/groups', getAllGroups)
      router.get('/groups/:id', getGroupInfo)
      router.get('/groups/:id/games', getGamesFromGroupBasedOnRating)
      router.post('/groups', createGroup)
      router.delete('/groups/:id', removeGroup)
      router.put('/groups/:id/games', addGameToGroup)
      router.delete('/groups/:id/games/:gameid', removeGameFromGroup)
      router.put('/groups/:id', updateGroup)

      return router

      function loadHomePage(req, rsp) {
            services.getMostPopularGames()
            .then(mpgames => {
                  services.getAllGroups(req.user.username)
                  .then(groups => { 
                        console.log(groups)
                        currGroups = groups
                        rsp.render('home', {games: mpgames, groups: groups})
                  })
            })
      }

      function getMostPopularGames(req, rsp) {
            services.getMostPopularGames()
            .then((games) => {
                  console.log(games)
                  rsp.render('groups', {username: req.user.username, games: games})
            })
            .catch(err => {
                  rsp.status(err.statusCode).json(err.message)
            })
      }

      function searchGame(req, rsp) {
            services.searchGame(req.query.id)
            .then(games => {
                  services.getAllGroups().then(groups => {
                        rsp.render('searchPage', {games: games, groups: currGroups})
                  })
                  
            })
            .catch(err => {
                  console.log(err)
                  if (err.status && err.message) { 
                        rsp.status(err.status).json(err.message)
                  } else {
                        rsp.status(404).json('Something happaned')
                  }
            })
      }

      function getGameDetails(req, rsp) {
            services.getGameDetails(req.params.id)
            .then(games => {
                  console.log(games)
                  let game = games[0]
                  rsp.render('gameDetails', {name: game.name, id: game.id, img_src: game.game_img1, genres: game.genres, total_rating: game.total_rating, groups: currGroups})
            })
            .catch(err => {
                  if (err.status && err.message) { 
                        rsp.status(err.status).json(err.message)
                  } else {
                        rsp.status(404).json('Something happaned')
                  }
            })
      }

      function getAllGroups(req, rsp) {
            services.getAllGroups(req.user.username)
            .then((groups) => {
                  currGroups = groups
                  rsp.render('groups', {groups: groups})
            })
            .catch(err => {
                  rsp.render('error', {message: 'Something happened', statusCode:404})//status(err.statusCode).json(err.message)
            })
      }

      function getGroupInfo(req, rsp) {
            services.getGroupInfo(req.params.id, req.user.username)
            .then(group => {
                  rsp.render('groupDetails', {id: group.id, groupName: group.name, description: group.description, games: group.games})
            })
            .catch(err => {
                  rsp.status(err.statusCode).json(err.message)
            });
      }

      function getGamesFromGroupBasedOnRating(req, rsp) {
            services.getGamesFromGroupBasedOnRating(req.params.id, req.query, req.user.username)
            .then(groupReturned => {
                  console.log('Group', groupReturned)
                  rsp.render('groupDetails', {games: groupReturned.games, groupName: groupReturned.name, id : groupReturned.id})
            })
            .catch(err => {
                  console.log(err)
                  rsp.status(err.statusCode).json(err.message)
            })
      }

      function createGroup(req, rsp) {
            services.createGroup(req.body, req.user.username)
            .then(() => {
                  rsp.redirect('/site/groups')
            })
            .catch(err => {
                  rsp.status(err.statusCode).json(err.message)
            })
      }

      function removeGroup(req, rsp) {
            services.removeGroup(req.params.id, req.user.username)
            .then(() => {
                  rsp.redirect('/site/groups')
            })
            .catch(err => {
                  rsp.status(err.statusCode).json(err.message)
            })
      }

      function addGameToGroup(req, rsp) {
            services.addGameToGroup(req.params.id, req.body, req.user.username)
            .then(() => {
                  rsp.redirect(`/site/groups/${req.params.id}`)
            })
            .catch(err => {
                  rsp.status(err.statusCode).json(err.message)
            })
      }

      function removeGameFromGroup(req, rsp) {
            services.removeGameFromGroup(req.params.id, req.params.gameid, req.user.username)
            .then(() => {
                  rsp.redirect(`/site/groups/${req.params.id}`)
            })
            .catch(err => {
                  rsp.status(err.statusCode).json(err.message)
            })
      }

      function updateGroup(req, rsp) {
            services.updateGroup(req.params.id, req.body, req.user.username)
            .then(() => {
                  rsp.redirect(`/site/groups/${req.params.id}`)
            })
            .catch(err => {
                  rsp.status(err.statusCode).json(err.message)
            })
      }

}