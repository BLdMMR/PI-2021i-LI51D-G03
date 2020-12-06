'use strict'

/** This is the only module that understands HTTP **/

module.exports = function(services) {
    if (!services) throw "No services module found"

    /** Get Most Popular Games
     * Gets information about the games with the most followers.
     * It's limited to the top 25 games. Feature is aligned to let
     * user choose the number of results to display
     * @param req
     * @param rsp
     */
    function getMostPopularGames(req, rsp) {
        services.getMostPopularGames(processResponse)
        function processResponse(err, data, res) {
            if (err) {
                rsp.status(err.statusCode)
                   .json(err.message)
            }
            else {
                rsp.status(200)
                   .json(JSON.parse(data))
            }
        }
    }

    /** Get Game By Name
     * Gets information about a specific game, which's name is passed
     * on through the request parameters. The name has to be spelled exactly
     * and it's case sensitive
     * @param req
     * @param rsp
     */
    function getGameByName(req, rsp) {
        let name = '"'+req.params.name+'"'

        services.getGameByName(name, processResponse)

        function processResponse(err, data) {
            if (err) {
                rsp.status(err.statusCode)
                   .json(err.message)
            }
            else {
                rsp.status(200)
                   .json(JSON.parse(data));
            }
        }
        
    }

    /** Get All Groups
     * Displays information about all groups created
     * @param req
     * @param rsp
     */
    function getAllGroups(req, rsp) {
        services.getAllGroups(processResponse);

        function processResponse(err, data) {
            if (err) {
                rsp.status(err.statusCode)
                   .json(err.message);

            }
            else {
                rsp.status(200)
                   .json(data);
            }
        }
    }

    function getGroupInfo(req, rsp) {
        services.getGroupInfo(req.params.id, processResponse)

        function processResponse(err, data) {
            if (err) {
                rsp.status(err.statusCode)
                   .json(err.message)
            }
            else {
                rsp.statusCode = 200
                rsp.json(data)
            }
        }
    }

    function getGamesFromGroupBasedOnRating(req, rsp) {
        services.getGamesFromGroupBasedOnRating(req.params.id, req.query, processResponse)

        function processResponse(err, data) {
            if (err) {
                rsp.status(err.statusCode)
                   .json(err.message)
            }
            else {
                rsp.status(200)
                   .json(data)
            }
        }
    }

    function createGroup(req, rsp) {
        services.createGroup(req.body, processResponse)

        function processResponse(err, data) {
            if (err) {
                rsp.status(err.statusCode)
                   .json(err.message)
            } else {
                console.log("Group created")
                rsp.status(201)
                   .json(data)
            }
        }
    }

    function addGameToGroup(req, rsp) {
        services.addGameToGroup(req.params.id, req.body, processResponse)

        function processResponse(err, data) {
            if (err) {
                rsp.status(err.statusCode)
                   .json(err.message)
            } else {
                console.log('Game Added to group')
                rsp.status(201)
                   .json(data)
            }
        }
    }

    function removeGameFromGroup(req, rsp) {
        services.removeGameFromGroup(req.params.id, req.params.gameid, processResponse)

        function processResponse(err, data) {
            if (err) {
                rsp.status(err.statusCode)
                   .json(err.message)
            } else {
                console.log('Game Removed to group')
                rsp.status(200)
                   .json(data)
            }
        }
    }

    function updateGroup(req, rsp) {
        services.updateGroup(req.params.id, req.body, processResponse)

        function processResponse(err, data) {
            if (err) {
                rsp.status(err.statusCode)
                   .json(err.message)
            } else {
                console.log('Group Updated')
                rsp.status(200)
                   .json(data)
            }
        }
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