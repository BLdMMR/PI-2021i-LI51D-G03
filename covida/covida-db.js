'use strict'
let groups = [];
let last_idx = 0;
module.exports =  function (fetch, userException) {
    if (!fetch) throw new userException('No fetch module found', 500)

    function getAllGroups(processResponse) {
        if (groups.length < 0)
            processResponse({
                message: "There are no groups in database",
                statusCode: 404
            })
        else {
            let groupList = []
            groups.forEach(group => groupList.push({id: group.id, name: group.name, description: group.description, number_of_games: group.games.length}))
            processResponse(null, groupList)
        }
    }

    function createGroup(details, processResponse) {
        if (!details.name)
            processResponse({
                message:'No group name given',
                statusCode: 400
            })
        else if (!details.description)
            processResponse({
                message:'No group description given',
                statusCode: 400
            })
        else {
            let group = {
                id: last_idx++,
                name: details.name,
                description: details.description,
                games: []
            }
            groups.push(group);
            processResponse(null, group);
        }
    }

    function removeGroup(groupId, processResponse) {
        let group = findGroup(groupId, null)
        if (!group) {
            processResponse({
                message: "No group in database with such id",
                statusCode: 404
            })
        }
        else{
            groups = groups.filter(grp => grp !== group)
            getAllGroups(processResponse)
        }
    }

    function getGroupInfo(groupId, processResponse) {
        const group = findGroup(groupId)
        if (!group) {
            processResponse({
                message: `No group in database with the name ${groupId}`,
                statusCode: 404
            })
        } else {
            processResponse(null, group)
        }
    }

    function getGamesFromGroupBasedOnRating(groupId, min, max, processResponse) {
        if (min > max) {
            processResponse({
                    message: "Minimum value bigger than maximum",
                    statusCode: 400
                }
            )
        }
        let group = findGroup(groupId);
        if(!group)
            processResponse({
                message: `No group in database with name ${groupId}`,
                statusCode: 404
            })
        else {
            let retGames = group.games.filter(game => game.total_rating > min && game.total_rating < max);
            if (retGames.length > 0) processResponse(null, retGames)
            else processResponse({
                message: `No games in group with ratings withing the values ${min} and ${max}`,
                statusCode: 404
            })
        }
    }

    function addGameToGroup(groupId, game, processResponse) {
        let group = findGroup(groupId);
        if (!group) {
            processResponse({
                message:`No group in database with the name ${groupId}`,
                statusCode: 404
            })
        } else {
            if (group.games.find(groupElement => game.name.toUpperCase() === groupElement.name.toUpperCase()))
                processResponse({
                    message:`The group already has a game with the name ${game.name}`,
                    statusCode: 400
                })
            else {
                group.games.push(game)
                processResponse(null, group)
            }
        }
    }

    function removeGameFromGroup(groupId, gameId, processResponse) {
        let group = findGroup(groupId)
        if (!group) {
            processResponse({
                message:`No group in database with the name ${groupId}`,
                statusCode: 404
            })
        }
        else if (!group.games.find(groupElement => gameId === groupElement.name))
            processResponse({
                message:`The group doesn't have a game with the name ${gameId}`,
                statusCode:404
            })
        else {
            group.games = group.games.filter(game => game.name !== gameId);
            processResponse(null, group.games)
        }
    }

    function updateGroup(groupId, details, processResponse) {
        let group = findGroup(groupId)
        if (!group) {
            processResponse({
                message: `No group in database with the name ${groupId}`,
                statusCode: 404

            })
        }
        else {
            if(details.name) group.name = details.name
            if(details.description) group.description = details.description
            processResponse(null, group)
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
     * Auxiliary function that fetches the group from the groups array either by name or by id
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