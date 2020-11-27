'use strict'

/** This is the only module that understands HTTP **/

module.exports = function(services) {

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
            rsp.json(data)
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
            rsp.write("Group created");
            rsp.json(data);
        }
    }

    function addGameToGroup(req, rsp) {

    }

    function removeGameFromGroup(req, rsp) {

    }

    function updateGroup(req, rsp) {

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