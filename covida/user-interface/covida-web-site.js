'use strict'

module.exports = function(services, router) {

      if (!services) {
            throw 'No services module found'
      }

      router.get('/home', loadHomePage)
      router.get('/popular', getMostPopularGames)
      router.get('/search', searchGame)
      router.get('/groups', getAllGroups)
      router.get('/groups/:id', getGroupInfo)
      router.get('/groups/:id/games', getGamesFromGroupBasedOnRating)
      router.post('/groups', createGroup)
      router.delete('/groups/:id', removeGroup)
      router.put('/groups/:id/games', addGameToGroup)
      router.put('/groups/:id/games/:gameid', removeGameFromGroup)
      router.put('/groups/:id', updateGroup)

      return router

      function loadHomePage(req, rsp) {
            services.getMostPopularGames()
            .then(mpgames => {
                  services.getAllGroups()
                  .then(groups => { 
                        console.log(mpgames)
                        rsp.render('groups', {games: mpgames, groups: groups})
                  })
            })
      }

      function getMostPopularGames(req, rsp) {
            services.getMostPopularGames(/*req.user.username*/)
            .then((games) => {
                  console.log(games)
                  rsp.render('groups', {username: "Banana On Crack"/*req.user.username*/, games: games})
            })
            .catch(err => {
                  rsp.status(err.statusCode).json(err.message)
            })
      }

      function searchGame(req, rsp) {
            services.searchGame(req.query.id)
            .then(games => {
                  let game = games[0]
                  services.getAllGroups().then(groups => {
                        rsp.render('gameDetails', {name: game.name, id: game.id, total_rating: game.total_rating, genres: game.genres, follows: game.follows, groups: groups})
                  })
                  
            })
            .catch(err => {
                  if (err.status != undefined && err.message != undefined) rsp.status(err.status).json(err.message)
                  else {
                        console.log('Fodeu para aqui')
                        rsp.status(404).json("fodeu")
                  }
            })
      }

      function getAllGroups(req, rsp) {
            services.getAllGroups(/*req.user.username*/)
            .then((groups) => {
                  console.log('Success')
                  rsp.render('groups', {groups: groups})
            })
            .catch(err => {
                  console.log('Error pá')
                  console.log(err)
                  rsp.render('error', {message: 'Fodeu', statusCode:404})//status(err.statusCode).json(err.message)
            })
      }

      function getGroupInfo(req, rsp) {
            services.getGroupInfo(req.params.id)
            .then(group => {
                  rsp.render('groupDetails', {groupName: group.name, description: group.description, games: group.games})
            })
            .catch(err => {
                  rsp.status(err.statusCode).json(err.message)
            });
      }

      function getGamesFromGroupBasedOnRating(req, rsp) {
            services.getGamesFromGroupBasedOnRating(req.params.id, req.query)
            .then(gameList => {
                  rsp.render()
            })
            .catch()
      }

      function createGroup(req, rsp) {
            services.createGroup(req.body)
            .then(() => {
                  rsp.redirect('/api/groups')
            })
            .catch(err => {
                  rsp.status(err.statusCode).json(err.message)
            })
      }

      function removeGroup(req, rsp) {
            services.removeGroup(req.params.id)
            .then(() => {
                  rsp.redirect('/api/groups')
            })
            .catch(err => {
                  rsp.status(err.statusCode).json(err.message)
            })
      }

      function addGameToGroup(req, rsp) {
            services.addGameToGroup(req.params.id, req.body)
            .then(() => {
                  rsp.redirect(`/api/groups/${req.params.id}`)
            })
            .catch(err => {
                  rsp.status(err.statusCode).json(err.message)
            })
      }

      function removeGameFromGroup(req, rsp) {
            services.removeGameFromGroup(req.params.id, req.params.gameid)
            .then(() => {
                  rsp.redirect(`/api/groups/${req.params.id}`)
            })
            .catch(err => {
                  rsp.status(err.statusCode).json(err.message)
            })
      }

      function updateGroup(req, rsp) {
            services.updateGroup(req.params.id, req.body)
            .then(() => {
                  rsp.redirect(`/api/groups/${req.params.id}`)
            })
            .catch(err => {
                  rsp.status(err.statusCode).json(err.message)
            })
      }

}