'use strict'

const MAXIMUM_RESULTS = 10000

module.exports = function(igdb_data, covida_db) {
    if (!igdb_data) throw "No web-api module found";
    if (!covida_db) throw "No covida_db module found";

    function getMostPopularGames() {
        let num_of_results = 15

        return igdb_data.getMostPopularGames(num_of_results);
    }

    function getGameByName(name, processResponse) {
        if (!name)
            processResponse({
                message:"No Name given",
                statusCode: 400
            })
        else{
            let formatedName = '"'+
                name.
                split("_").
                reduce((stringToFrom, currentWord) => stringToFrom + ' ' + currentWord) +
                '"'
            igdb_data.getGameByName(formatedName, processResponse);
        }

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

    function removeGroup(groupId, processResponse) {
        if (!groupId) processResponse({
            message:"No group id given",
            statusCode: 400
        })
        else
            covida_db.removeGroup(groupId, processResponse)
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
        else{
            let formatedName = gameId.
                split("_").
                reduce((stringToFrom, currentWord) => stringToFrom + ' ' + currentWord)
            covida_db.removeGameFromGroup(groupName, formatedName, processResponse)
        }
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
        removeGroup: removeGroup,
        addGameToGroup: addGameToGroup,
        removeGameFromGroup: removeGameFromGroup,
        updateGroup: updateGroup
    }


}