'use strict'

/** This is the only module that understands HTTP **/

module.exports = function(services, userException) {
    if (!services) throw "No services module found"

    function getMostPopularGames(req, rsp) {
        services.getMostPopularGames()
            .then(data => {
                rsp.status(200)
                    .json(data)
            })
            .catch(err => {
                console.log(err)
                rsp.status(err.errorStatusCode)
                    .json(err.errorMessage)
            })
    }


    function searchGame(req, rsp) {
        services.searchGame(req.params.id)
            .then(data => {
                rsp.status(200)
                    .json(data);
            })
            .catch(err => {
                rsp.status(err.statusCode)
                    .json(err.message)
            })
    }

    function getAllGroups(req, rsp) {
        services.getAllGroups()
            .then(data =>  {
                console.log(`Success`)
                rsp.status(200)
                    .json(data);
            })
            .catch(err => {
                console.log("Error")
                rsp.status(err.statusCode)
                    .json(err.message);

            });
    }

    function getGroupInfo(req, rsp) {
        services.getGroupInfo(req.params.id)
            .then(data => {
                console.log(`Success`)
                rsp.statusCode = 200
                rsp.json(data)
            })
            .catch(err => {
                console.log("Error")
                rsp.status(err.statusCode)
                    .json(err.message)
            })
    }

    function getGamesFromGroupBasedOnRating(req, rsp) {
        services.getGamesFromGroupBasedOnRating(req.params.id, req.query)
            .then(data => {
                rsp.status(200)
                    .json(data)
            })
            .catch(err => {
                rsp.status(err.statusCode)
                    .json(err.message)
            })
    }

    function createGroup(req, rsp) {
        services.createGroup(req.body)
            .then(data => {
                console.log("Group created")
                rsp.status(201)
                    .json(data)
            })
            .catch(err => {
                rsp.status(err.statusCode)
                    .json(err.message)
            })
    }

    function removeGroup(req, rsp) {
        services.removeGroup(req.params.id)
            .then(data => {
                console.log("Group Removed")
                rsp.status(200)
                    .json(data)
            })
            .catch(err => {
                rsp.status(err.statusCode)
                    .json(err.message)
            })
    }

    function addGameToGroup(req, rsp) {
        services.addGameToGroup(req.params.id, req.body)
            .then(data => {
                rsp.status(201)
                    .json(data)
            })
            .catch(err => {
                rsp.status(err.statusCode)
                    .json(err.message)
            })
        function processResponse(err, data) {
            if (err) {
                rsp.status(err.statusCode)
                   .json(err.message)
            } else {
                console.log('Game Added to group')
                rsp.status(201)
                   .json(data)
            }
        }
    }

    function removeGameFromGroup(req, rsp) {
        services.removeGameFromGroup(req.params.id, req.params.gameid)
            .then(data => {
                console.log('Game Removed to group')
                rsp.status(200)
                    .json(data)
            })
            .catch(err => {
                rsp.status(err.statusCode)
                    .json(err.message)
            })
    }

    function updateGroup(req, rsp) {
        services.updateGroup(req.params.id, req.body)
            .then(data => {
                console.log('Group Updated')
                rsp.status(200)
                    .json(data)
            })
            .catch(err => {
                rsp.status(err.statusCode)
                    .json(err.message)
            })
        function processResponse(err, data) {
            if (err) {
                rsp.status(err.statusCode)
                   .json(err.message)
            } else {
                console.log('Group Updated')
                rsp.status(200)
                   .json(data)
            }
        }
    }

    return {
        getMostPopularGames: getMostPopularGames,
        searchGame: searchGame,
        getAllGroups: getAllGroups,
        getGroupInfo: getGroupInfo,
        getGamesFromGroupBasedOnRating: getGamesFromGroupBasedOnRating,
        createGroup: createGroup,
        removeGroup: removeGroup,
        addGameToGroup: addGameToGroup,
        removeGameFromGroup: removeGameFromGroup,
        updateGroup: updateGroup
    }

}