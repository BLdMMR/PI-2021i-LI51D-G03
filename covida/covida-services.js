'use strict'

const { response } = require("express")

const MAXIMUM_RESULTS = 10000

module.exports = function(igdb_data, covida_db, usersDb) {
    if (!igdb_data) throw "No web-api module found"
    if (!covida_db) throw "No covida_db module found"
    if (!usersDb) throw "No usersDb module found"

    function getMostPopularGames() {
        return igdb_data.getMostPopularGames();
    }

    function searchGame(id) {
        if (!id)
            return Promise.reject({
                message:"No id given",
                statusCode: 400
            })
        else{
            return igdb_data.searchGame(parseInt(id));
        }

    }

    function getAllGroups(username) {
        return covida_db.getAllGroups(username)
    }

    function getGroupInfo(id, username) {
        if (!id)
            return Promise.reject({
                message: `No id given`,
                statusCode: 400
            })
        else
            return covida_db.getGroupInfo(id, username);
    }

    function getGamesFromGroupBasedOnRating(id, details) {
        const max = parseInt(details.max)
        const min = parseInt(details.min)

        if (!id)
            return Promise.reject({
                message:"No group id given",
                statusCode: 400
            })
        else if (isNaN(max) || max > 100)
            return Promise.reject({
                message: "Invalid max value given",
                statusCode: 400
            })
        else if (isNaN(min) || min < 0)
            return Promise.reject({
                message: "Invalid min value given",
                statusCode: 400
            })
        else
            return covida_db.getGamesFromGroupBasedOnRating(id, min, max, username)
    }

    function createGroup(group, username) {
        if (!group)
            return Promise.reject({
                message: "No group details given",
                statusCode: 400
            })
        else
            return covida_db.createGroup(group, username)
    }

    function removeGroup(groupId, username) {
        if (!groupId) {
            Promise.reject({
                message: "No group id given",
                statusCode: 400
            })
        }
        else
            return covida_db.removeGroup(groupId, username)
    }

    function addGameToGroup(groupId, game, username) {
        if (!groupId)
            return Promise.reject({
                message: "No group id given",
                statusCode: 400
            })
        else if (!game)
            return Promise.reject({
                message: "No game details given",
                statusCode: 400
            })
        else{
            return covida_db.addGameToGroup(groupId, game, username)
        }

    }

    function removeGameFromGroup(groupId, gameId, username) {
        let id = parseInt(gameId)
        if (!groupId)
            return Promise.reject({
                message: "No group id given",
                statusCode: 400
            })
        else if (!gameId || isNaN(id))
            return Promise.reject({
                message: "invalid game id given",
                statusCode: 400
            })
        else{
            return covida_db.removeGameFromGroup(groupId, id, username)
        }
    }

    function updateGroup(groupName, details, username) {
        if (!groupName)
            return Promise.reject({
                message: "No group id given",
                statusCode: 400
            })
        else if (!details)
            return Promise.reject({
                message: "No group details given",
                statusCode: 400
            })
        else
            return covida_db.updateGroup(groupName, details, username)
    }

    function verifyLoginCredentials(givenCredentials) {
        return usersDb.getUser(givenCredentials.username)
        .then(user => {
            if (!user || givenCredentials.password != user._source.password) {
                return {validCredentials: false, error: 'Username or password invalid'}
            } else {
                return Promise.resolve({validCredentials: true})
            }
        })
    }

    function createUser(userCredentials) {
        if (!userCredentials) {
            return Promise.reject({message: 'No credentials given', statusCode: 400})
        }
        return usersDb.createUser(userCredentials.username, userCredentials.password)
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
        updateGroup: updateGroup,
        verifyLoginCredentials: verifyLoginCredentials,
        createUser: createUser
    }


}