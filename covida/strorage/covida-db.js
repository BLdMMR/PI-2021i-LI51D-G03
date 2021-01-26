'use strict'
let groups = [];
let last_idx = 0;
module.exports =  function (fetch, esUrl) {
    if (!fetch) throw 'No fetch module found'

    //PROMISED & WITH ES
    async function getAllGroups(username) {
        const response = await fetch(`${esUrl}/groups/_search`)
        const result = await response.json()
        if (result.hits.hits.length <= 0){
            console.log('erro na db')
            return Promise.reject({
                message: "There are no groups in database",
                statusCode: 404
            })
        }else {
            let groupList = []
            result.hits.hits.forEach(group => {if (group._source.username === username) groupList.push({
                id: group._source.id,
                name: group._source.name,
                description: group._source.description,
                number_of_games: group._source.games.length
            })})

            return Promise.resolve(groupList)
        }
    }

    //PROMISED & WITH ES
    async function getGroupInfo(groupId, username) {
        const group = await findGroup(groupId, username)
        if (!group) {
            return Promise.reject({
                message: `No group in database with the id ${groupId}`,
                statusCode: 404
            })
        } else {
            return group._source
        }
    }

    function hasReadableCharacters(groupName) {
        return groupName.trim().length !== 0
    }

    //PROMISED & WITH ES
    async function createGroup(details, username) {
        if (!details.name || !hasReadableCharacters(details.name))

            return Promise.reject(
                {message: 'No group name given or unable to be read', statusCode: 400}
            )

        else if (!details.description)

            return Promise.reject(
                {message: 'No group description given or unable to be read', statusCode: 400}
            )

        else {

            const res = await fetch(`${esUrl}/groups/_search`)
            const idx_res = await res.json()
            last_idx = 0

            while (idx_res.hits.hits.some(group => group._source.id === last_idx)) {
                last_idx++;
            }

            let group = {
                username: username,
                id: last_idx,
                name: details.name,
                description: details.description,
                games: []
            }

            const response = await fetch(`${esUrl}/groups/_doc`, {
                method:'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(group)
            })

            const result = await response.json()
            if (!result) return Promise.reject({message: 'Unable to create group',statusCode: 500})
            return Promise.resolve(group)
        }
    }

    //PROMISED & WITH ES
    //TODO -> change so it displays the result updated. It's showing all groups with the removed group still in it
    async function removeGroup(groupId, username) {
        let groupToRemove = await findGroup(groupId, username)
        if (!groupToRemove) {
            return Promise.reject({message: "No group in database with such id", statusCode: 404})
        }
        else{
            const response = await fetch(`${esUrl}/groups/_doc/${groupToRemove._id}`,{
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: {}
            })
            const result = await response.json()
            if (!result) {
                return Promise.reject({message: 'Unable to remove group',statusCode: 500})
            }
            return await getAllGroups()
        }
    }

    //PROMISED & WITH ES
    async function getGamesFromGroupBasedOnRating(groupId, min, max, username) {
        if (min > max) {
            return Promise.reject({
                    message: "Minimum value bigger than maximum",
                    statusCode: 400
                }
            )
        }
        let group = await findGroup(groupId, username);
        if (!group)
            return Promise.reject({
                message: `No group in database with name ${groupId}`,
                statusCode: 404
            })
        else {
            let retGames = group._source.games.filter(game => game.total_rating >= min && game.total_rating <= max);
            if (retGames.length > 0) return Promise.resolve(retGames)
            else return Promise.reject({
                message: `No games in group with ratings withing the values ${min} and ${max}`,
                statusCode: 404
            })
        }
    }

    //PROMISED & WITH ES
    async function addGameToGroup(groupId, game, username) {
        let group = await findGroup(groupId, username);
        if (!group) {
            return Promise.reject({
                message:`No group in database with the id ${groupId}`,
                statusCode: 404
            })
        } else {
            if (group._source.games.some(groupElement => game.name.toUpperCase() === groupElement.name.toUpperCase()))
                return Promise.reject({
                    message:`The group already has a game with the id ${game.id}`,
                    statusCode: 400
                })
            else {
                await fetch(`${esUrl}/groups/_doc/${group._id}`, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(group._source)
                })
                //const result = await response.json()
                //if (!result) return Promise.reject('Unable to add the game to the group', 500)

                return group._source
            }
        }
    }

    //PROMISED & WITH ES
    async function removeGameFromGroup(groupId, gameId, username) {
        let group = await findGroup(groupId, username)
        if (!group) {
            return Promise.reject({
                message:`No group in database with the id ${groupId}`,
                statusCode: 404
            })
        }
        else if (!group._source.games.some(groupGame => gameId === groupGame.id))
            return Promise.reject({
                message:`The group doesn't have a game with the id ${gameId}`,
                statusCode:404
            })
        else {
            group._source.games = group._source.games.filter(game => game.id !== gameId);
            await fetch(`${esUrl}/groups/_doc/${group._id}`,{
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(group._source)
            })
            return Promise.resolve(group._source)
        }
    }

    //PROMISED & WITH ES
    async function updateGroup(groupId, details, username) {
        let group = await findGroup(groupId, username)
        if (!group) {
            return Promise.reject({
                message: `No group in database with the name ${groupId}`,
                statusCode: 404

            })
        } else {
            if (details.name && hasReadableCharacters(details.name)) group._source.name = details.name
            if (details.description) group._source.description = details.description

            await fetch(`${esUrl}/groups/_doc/${group._id}`,{
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(group._source)
            })
            return Promise.resolve(group._source)
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
    async function findGroup(id, username) {
        if (id != null) {
            const response = await fetch(`${esUrl}/groups/_search`)
            const result = await response.json()
            return result.hits.hits.filter(element => element._source.id === parseInt(id) && element._source.username === username)[0]
        }
    }


    //NOT WORKING PROPERLY, NO TIME TO FIX...
    async function loadMock() {

        /*
        await createGroup({ name: "Best Games", description: "A group of great games"})
        await addGameToGroup(0, {id: 1020, name: "Grand Theft Auto V", follows: 1699, total_rating: 93.436101})
        await addGameToGroup(0, {id: 1942, name: "The Witcher 3: Wild Hunt", follows: 1467, total_rating: 93.672166})
        await addGameToGroup(0, {id: 472, name: "The Elder Scrolls V: Skyrim", follows: 1025, total_rating: 91.911974})
        await addGameToGroup(0, {id: 732, name: "Grand Theft Auto: San Andreas", follows: 955, total_rating: 91.757998})
        await addGameToGroup(0, {id: 72, name: "Portal 2", follows: 949, total_rating: 91.885120})

        await createGroup({ name: "2nd Best Games", description: "Another group of great games, not as good as he first ones"})
        await addGameToGroup(1,{id: 71, name: "Portal", follows: 886, total_rating: 83.538920} )
        await addGameToGroup(1, {id: 233, name: "Half-Life 2", follows: 885, total_rating: 90.960823})
        await addGameToGroup(1, {id: 1877, name: "Cyberpunk 2077", follows: 856, total_rating: 0})
        await addGameToGroup(1, {id: 1009, name: "The Last of Us", follows: 835, total_rating: 93.017695})
        await addGameToGroup(1, {id: 74, name: "Mass Effect 2", follows: 785, total_rating: 93.690090})
         */
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