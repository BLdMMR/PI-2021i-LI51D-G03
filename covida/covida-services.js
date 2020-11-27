'use strict'

const MAXIMUM_RESULTS = 10000

module.exports = function(igdb_data, covida_db) {
    if (!igdb_data) return "No web-api module found";
    if (!covida_db) return "No covida_db module found";

    function getMostPopularGames(num_of_res, cb) {
        console.log("slam banana")
        // if (num_of_res > MAXIMUM_RESULTS) num_of_res = MAXIMUM_RESULTS
        // if (!num_of_res) num_of_res = 25
        num_of_res = 25

        igdb_data.getMostPopularGames(num_of_res, cb);
    }

    function getGameByName(name, cb) {
        console.log('slam banana by name')
        igdb_data.getGameByName(name, cb);
    }

    function getAllGroups(details, cb) {
        covida_db.getAllGroups(details, cb)
    }

    function getGroupInfo(id, cb) {
        covida_db.getGroupInfo(id, cb);
    }

    function getGamesFromGroupBasedOnRating(min, max, cb) {
        //return covida_db.getGamesFromGroupBasedOnRating(min, max, cb);
    }

    function createGroup(group, cb) {
        let details = {
            name: group.name,
            description: group.description
        }
        covida_db.createGroup(details, cb)
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