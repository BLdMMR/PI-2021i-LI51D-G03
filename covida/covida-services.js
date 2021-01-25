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

    function getAllGroups() {
        return covida_db.getAllGroups()
    }

    function getGroupInfo(id) {
        if (!id)
            return Promise.reject({
                message: `No id given`,
                statusCode: 400
            })
        else
            return covida_db.getGroupInfo(id);
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
            return covida_db.getGamesFromGroupBasedOnRating(id, min, max)
    }

    function createGroup(group) {
        if (!group)
            return Promise.reject({
                message: "No group details given",
                statusCode: 400
            })
        else
            return covida_db.createGroup(group)
    }

    function removeGroup(groupId) {
        if (!groupId) {
            Promise.reject({
                message: "No group id given",
                statusCode: 400
            })
        }
        else
            return covida_db.removeGroup(groupId)
    }

    function addGameToGroup(groupId, game) {
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
            return covida_db.addGameToGroup(groupId, game)
        }

    }

    function removeGameFromGroup(groupId, gameId) {
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
            return covida_db.removeGameFromGroup(groupId, id)
        }
    }

    function updateGroup(groupName, details) {
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
            return covida_db.updateGroup(groupName, details)
    }

    function verifyLoginCredentials(givenCredentials) {
        return usersDb.getUser(givenCredentials.username)
        .then(user => {
            console.log(user)
            console.log(givenCredentials.password, user.password)
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