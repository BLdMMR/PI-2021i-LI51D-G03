'use strict'

/** This is the only module that understands HTTP **/

module.exports = function(services) {
    if (!services) throw "No services module found"

    /** Get Most Popular Games
     * Gets information about the games with the most followers.
     * It's limited to the top 25 games. Feature is aligned to let
     * user choose the number of results to display
     * TODO-> read from querystring the amout of results to display
     * @param req
     * @param rsp
     */
    function getMostPopularGames(req, rsp) {
        console.log("super slam banana")
        console.log(req.query.count)
        services.getMostPopularGames(0, processResponse)
        function processResponse(err, data) {
            console.log(data.toString())
            if (!err) {
                rsp.statusCode = 400;
                rsp.write(`Error: ${err}`)
                return
            }
            rsp.write(data)
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
        console.log("super slam banana by name")

        services.getGameByName(req.params.name, processResponse)

        function processResponse(err, data) {
            console.log(data.toString())
            if (err) {
                rsp.statusCode = 400;
                rsp.write(`Error: ${err}`)
                return
            }
            rsp.write(data);
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
                rsp.statusCode = 400;
                rsp.error(err);
                return
            }
            rsp.write(data);
        }
    }

    function getGroupInfo(req, rsp) {
        services.getGroupInfo(req.params.id, processResponse)

        function processResponse(err, data) {
            if (err) {
                rsp.error(err)
                return
            }
            rsp.end(data)
        }
    }

    function getGamesFromGroupBasedOnRating(req, rsp) {

    }

    function createGroup(req, rsp) {
        services.createGroup(req.body, processResponse)

        function processResponse(err, data) {
            if (err) {
                rsp.error(err)
                return
            }
            rsp.statusCode = 200;
            rsp.write("Group created");
            rsp.end(data);
        }
    }

    function addGameToGroup(req, rsp) {
        services.addGameToGroup(req.params.id, req.body, processResponse)

        function processResponse(err, data) {
            if (err) {
                rsp.error(err);
            } else {
                rsp.write('Game Added to group')
                rsp.end(data)
            }
        }
    }

    function removeGameFromGroup(req, rsp) {
        services.removeGameFromGroup(req.params.name, req.params.gameid, processResponse)

        function processResponse(err, data) {
            if (err) {
                rsp.error(err);
            } else {
                rsp.write('Game Removed to group')
                rsp.end(data)
            }
        }
    }

    function updateGroup(req, rsp) {
        services.updateGroup(req.params.id, req.body, processResponse)

        function processResponse(err, data) {
            if (err) {
                rsp.error(err);
            } else {
                rsp.write('Group Updated')
                rsp.end(data)
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


    //TODO-> Review status codes and responses

}