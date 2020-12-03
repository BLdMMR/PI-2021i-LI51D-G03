'use strict'
let groups = [];
let last_idx = -1;
module.exports =  function () {
    function getAllGroups(cb) {
        let groupNames = []
        groups.forEach(group => groupNames.push(group.name))
        cb(groupNames)
    }

    function createGroup(details, cb) {
        if (findGroup(details.name)) cb('Group Already in DB')
        else {
            groups.push({
                id: ++last_idx,
                name: details.name,
                description: details.description,
                games: []
            });
            cb(null, groups[last_idx]);
        }
    }

    function getGroupInfo(name, cb) {
        const group = findGroup(name)
        if (group) cb(null, group)
        else cb(`No group in database with the name ${name}`)
    }

    function getGamesFromGroupBasedOnRating(name, min, max, cb) {
        let group = findGroup(name);
        if(!group) cb(`No groups in database with name ${name}`)
        else {
            let retGames = group.games
            retGames.filter(game => {game.total_rating > min && game.total_rating < max});
            if (retGames.length > 0) cb(null, retGames)
            else cb(null, `No games in group with ratings withing the values ${min} and ${max}`)
        }
    }

    function addGameToGroup(groupName, game, cb) {
        let group = findGroup(groupName);
        if (group) {
            if (group.games.find(groupElement => game.name.toUpperCase() === groupElement.name.toUpperCase()))
                cb(`The group already has a game with the name ${game.name}`)
            else {
                group.games.push(game)
                cb(null, group)
            }
        }
        else cb(`There is no group with the name ${groupName}`)
    }

    function removeGameFromGroup(groupName, gameId, cb) {
        let group = findGroup(groupName)
        if (group) {
            if (!group.games.find(groupElement => game.name.toUpperCase() === groupElement.name.toUpperCase()))
                cb(`The group doesn't have a game with the name ${game.name}`)
            else {
                group.games.filter(game => game.name != gameId);
                cb(null, group.games)
            }
        }
    }

    function updateGroup(groupId, details, cb) {
        let group = findGroup(groupId)
        if (!group) {
            cb('No group in database with such name')
        }
        else {
            if(details.name) group.name = details.name
            if(details.description) group.description = details.description
            cb(null, group)
        }
    }




    return {
        getAllGroups: getAllGroups,
        createGroup: createGroup,
        getGroupInfo: getGroupInfo,
        addGameToGroup: addGameToGroup,
        removeGameFromGroup: removeGameFromGroup,
        updateGroup: updateGroup
    }

    /**
     * Auxiliary function that fetches the group from the groups array either by name or by id
     * @param name
     * @param id
     * @returns {*}
     */
    function findGroup(name, id) {
        if (name != null) return  groups.find(grp => grp.name.toUpperCase() === name.toUpperCase());
        if (id != null) return  groups.find(grp => grp.id == id);
        throw "No group specified through name or id"
    }

    //TODO-> Add the remaining else clauses to the methods
}