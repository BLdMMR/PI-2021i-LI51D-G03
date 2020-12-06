'use strict'

const MAXIMUM_RESULTS = 10000

module.exports = function(igdb_data, covida_db) {
    if (!igdb_data) throw "No web-api module found";
    if (!covida_db) throw "No covida_db module found";

    function getMostPopularGames(processResponse) {
        let num_of_results = 15

        igdb_data.getMostPopularGames(num_of_results, processResponse);
    }

    function getGameByName(name, processResponse) {
        if (!name)
            processResponse({
                message:"No Name given",
                statusCode: 400
            })
        else
            igdb_data.getGameByName(name, processResponse);
    }

    function getAllGroups(processResponse) {
        covida_db.getAllGroups(processResponse)
    }

    function getGroupInfo(id, processResponse) {
        if (!id)
            processResponse({
                message:"No group id given",
                statusCode: 400
            })
        else
            covida_db.getGroupInfo(id, processResponse);
    }

    function getGamesFromGroupBasedOnRating(id, details, processResponse) {
        if (!id)
            processResponse({
                message:"No group id given",
                statusCode: 400
            })
        else if (!parseInt(details.max))
            processResponse({
                message: "No max value given",
                statusCode: 400
            })
        else if (!parseInt(details.min))
            processResponse({
                message: "No min value given",
                statusCode: 400
            })
        else
            covida_db.getGamesFromGroupBasedOnRating(id, parseInt(details.min), parseInt(details.max), processResponse)
    }

    function createGroup(group, processResponse) {
        if (!group)
            processResponse({
                message: "No group details given",
                statusCode: 400
            })
        else
            covida_db.createGroup(group, processResponse)
    }

    function addGameToGroup(groupName, game, processResponse) {
        if (!groupName)
            processResponse({
                message: "No group id given",
                statusCode: 400
            })
        else if (!game)
            processResponse({
                message: "No game details given",
                statusCode: 400
            })
        else
            covida_db.addGameToGroup(groupName, game, processResponse)
    }

    function removeGameFromGroup(groupName, gameId, processResponse) {
        if (!groupName)
            processResponse({
                message: "No group id given",
                statusCode: 400
            })
        else if (!gameId)
            processResponse({
                message: "No game id given",
                statusCode: 400
            })
        else
            covida_db.removeGameFromGroup(groupName, gameId, processResponse)
    }

    function updateGroup(groupName, details, processResponse) {
        if (!groupName)
            processResponse({
                message: "No group id given",
                statusCode: 400
            })
        else if (!details)
            processResponse({
                message: "No group details given",
                statusCode: 400
            })
        else
            covida_db.updateGroup(groupName, details, processResponse)
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