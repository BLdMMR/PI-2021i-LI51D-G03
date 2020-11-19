'use strict'

module.exports = {
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

function getMostPopularGames(req, rsp) {
    rsp
        .status(200)
        .end("getMostPopularGames");
}
function getGameByName(req, rsp) {
    rsp
        .status(200)
        .end("getGameByName");
}
function getAllGroups(req, rsp) {
    rsp
        .status(200)
        .end("getAllGroups");
}
function getGroupInfo(req, rsp) {
    rsp
        .status(200)
        .end("getGroupInfo");
}
function getGamesFromGroupBasedOnRating(req, rsp) {
    rsp
        .status(200)
        .end("getGamesFromGroupBasedOnRating");
}
function createGroup(req, rsp) {
    rsp
        .status(200)
        .end("createGroup");
}
function addGameToGroup(req, rsp) {
    rsp
        .status(200)
        .end("addGameToGroup");
}
function removeGameFromGroup(req, rsp) {
    rsp
        .status(200)
        .end("removeGameFromGroup");
}
function updateGroup(req, rsp) {
    rsp
        .status(200)
        .end("updateGroup");
}