'use strict'

/** This is the only module that understands HTTP **/

module.exports = function(services) {

    function getMostPopularGames(req, rsp) {
        console.log("super slam banana")
        console.log(req.query.count)
        services.getMostPopularGames(0, processResponse)
        function processResponse(err, data) {
            rsp.write(data)
        }
    }

    function getGameByName(req, rsp) {
        console.log("super slam banana by name")

        req.params
        
    }

    function getAllGroups(req, rsp) {

    }

    function getGroupInfo(req, rsp) {

    }

    function getGamesFromGroupBasedOnRating(req, rsp) {

    }

    function createGroup(req, rsp) {

    }

    function addGameToGroup(req, rsp) {

    }

    function removeGameFromGroup(req, rsp) {

    }

    function updateGroup(req, rsp) {

    }

    return {
        getMostPopularGames: getMostPopularGames,
        getGameByName: getGameByName,
        getAllGroups: getAllGroups,
        getGroupInfo: getGroupInfo,
        getGamesFromGroupBasedOnRating: getGamesFromGroupBasedOnRating,
        createGroup: createGroup,
        addGameToGroup: addGameToGroup,
        removeGameFromGroup: removeGameFromGroup,
        updateGroup: updateGroup
    }

}