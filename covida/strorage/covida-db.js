'use strict'
let groups = [];
let last_idx = 0;
module.exports =  function (fetch, esUrl, userException) {
    if (!fetch) throw 'No fetch module found'

    //PROMISED
    async function getAllGroups() {
        if (groups.length <= 0)
            return Promise.reject({
                message: "There are no groups in database",
                statusCode: 404
            })
        else {
            let groupList = []
            groups.forEach(group => groupList.push({id: group.id, name: group.name, description: group.description, number_of_games: group.games.length}))
            return Promise.resolve(groupList)
        }
    }

    //PROMISED
    async function getGroupInfo(groupId) {
        const group = findGroup(groupId)
        if (!group) {
            return Promise.reject({
                message: `No group in database with the id ${groupId}`,
                statusCode: 404
            })
        } else {
            return Promise.resolve(group)
        }
    }

    function hasReadableCharacters(groupName) {
        return groupName.trim().length !== 0
    }

    //PROMISED
    function createGroup(details) {
        if (!details.name || !hasReadableCharacters(details.name))
            return Promise.reject(userException('No group name given or empty', 400))
        else if (!details.description)
            return Promise.reject(userException('No group description given', 400))
        else {
            let group = {
                id: last_idx++,
                name: details.name,
                description: details.description,
                games: []
            }
            groups.push(group);
            return Promise.resolve(group)
        }
    }

    //PROMISED
    function removeGroup(groupId) {
        let groupToRemove = findGroup(groupId)
        if (!groupToRemove) {
            return Promise.reject(new userException("No group in database with such id", 404))
        }
        else{
            groups = groups.filter(grp => grp !== groupToRemove)
            return getAllGroups()
        }
    }

    //PROMISED
    function getGamesFromGroupBasedOnRating(groupId, min, max) {
        if (min > max) {
            return Promise.reject({
                    message: "Minimum value bigger than maximum",
                    statusCode: 400
                }
            )
        }
        let group = findGroup(groupId);
        if(!group)
            return Promise.reject({
                message: `No group in database with name ${groupId}`,
                statusCode: 404
            })
        else {
            let retGames = group.games.filter(game => game.total_rating >= min && game.total_rating <= max);
            if (retGames.length > 0) return Promise.resolve(retGames)
            else return Promise.reject({
                message: `No games in group with ratings withing the values ${min} and ${max}`,
                statusCode: 404
            })
        }
    }

    //PROMISED
    function addGameToGroup(groupId, game) {
        let group = findGroup(groupId);
        if (!group) {
            return Promise.reject({
                message:`No group in database with the id ${groupId}`,
                statusCode: 404
            })
        } else {
            if (group.games.find(groupElement => game.name.toUpperCase() === groupElement.name.toUpperCase()))
                return Promise.reject({
                    message:`The group already has a game with the name ${game.name}`,
                    statusCode: 400
                })
            else {
                group.games.push(game)
                return Promise.resolve(group)
            }
        }
    }


    //PROMISED
    function removeGameFromGroup(groupId, gameId) {
        let group = findGroup(groupId)
        console.log(typeof gameId)
        group.games.forEach(game => console.log(game.name + ': ' +game.id + ' -> ' + typeof game.id))
        if (!group) {
            return Promise.reject({
                message:`No group in database with the id ${groupId}`,
                statusCode: 404
            })
        }
        else if (!group.games.find(groupElement => gameId === groupElement.id))
            return Promise.reject({
                message:`The group doesn't have a game with the id ${gameId}`,
                statusCode:404
            })
        else {
            group.games = group.games.filter(game => game.id !== gameId);
            return Promise.resolve(group.games)
        }
    }
    //PROMISED
    function updateGroup(groupId, details) {
        let group = findGroup(groupId)
        if (!group) {
            return Promise.reject({
                message: `No group in database with the name ${groupId}`,
                statusCode: 404

            })
        }
        else {
            if(details.name) group.name = details.name
            if(details.description) group.description = details.description
            return Promise.resolve(group)
        }
    }

    return {
        getAllGroups: getAllGroups,
        createGroup: createGroup,
        removeGroup: removeGroup,
        getGroupInfo: getGroupInfo,
        addGameToGroup: addGameToGroup,
        removeGameFromGroup: removeGameFromGroup,
        updateGroup: updateGroup,
        getGamesFromGroupBasedOnRating: getGamesFromGroupBasedOnRating,
        loadMock: loadMock
    }

    /**
     * Auxiliary function that fetches the group from the groups array either by id or by name
     * @param name
     * @param id
     * @returns {*}
     */
    function findGroup(id, name) {
        if (name != null) return  groups.find(grp => grp.name.toUpperCase() === name.toUpperCase());
        if (id != null) return  groups.find(grp => grp.id == id);
        throw "No group specified through name or id"
    }

    function loadMock() {
        groups = [
            {
                id: 0,
                name: "Best Games",
                description: "A group of great games",
                games : [
                    {id: 1020, name: "Grand Theft Auto V", follows: 1699, total_rating: 93.436101},
                    {id: 1942, name: "The Witcher 3: Wild Hunt", follows: 1467, total_rating: 93.672166},
                    {id: 472, name: "The Elder Scrolls V: Skyrim", follows: 1025, total_rating: 91.911974},
                    {id: 732, name: "Grand Theft Auto: San Andreas", follows: 955, total_rating: 91.757998},
                    {id: 72, name: "Portal 2", follows: 949, total_rating: 91.885120},

                ]
            },
            {
                id: 1,
                name: "2nd Best Games",
                description: "Another group of great games, not as good as he first ones",
                games : [
                    {id: 71, name: "Portal", follows: 886, total_rating: 83.538920},
                    {id: 233, name: "Half-Life 2", follows: 885, total_rating: 90.960823},
                    {id: 1877, name: "Cyberpunk 2077", follows: 856, total_rating: 0},
                    {id: 1009, name: "The Last of Us", follows: 835, total_rating: 93.017695},
                    {id: 74, name: "Mass Effect 2", follows: 785, total_rating: 93.690090},

                ]
            }
        ]
        last_idx = 2
    }

}

/* Group Format
id: ,
name: ,
description: ,
games: []
* */

/* Game Format
id: ,
name: ,
follows: ,
total_rating:
* */