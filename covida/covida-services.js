'use strict'

module.exports = function(igdb_data, covida_db) {
    if (!igdb_data) return "No web-api module found";
    if (!covida_db) return "No covida_db module found";

    function getMostPopularGames(cb) {
        console.log("slam banana")
        return igdb_data.getMostPopularGames(cb);
    }

    function getGameByName(name, cb) {
       // return igdb_data.getGameByName(name, cb);
    }

    function getAllGroups(cb) {
        //return covida_db.getAllGroups(cb)
    }

    function getGroupInfo(id, cb) {
        //return covida_db.getGroupInfo(id, cb);
    }

    function getGamesFromGroupBasedOnRating(min, max, cb) {
        //return covida_db.getGamesFromGroupBasedOnRating(min, max, cb);
    }

    function createGroup(group, cb) {

    }

    function addGameToGroup() {

    }

    function removeGameFromGroup() {

    }

    function updateGroup() {

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