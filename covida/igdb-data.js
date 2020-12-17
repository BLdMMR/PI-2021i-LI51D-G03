const base_api_url = "https://api.igdb.com/v4"
const credentials = {
    access_token: "4fa2e2xd03b9slsfjacex2yfo9xmbe",
    expires_in: 5462024,
    token_type: "bearer",
    client_id : "kul61h0ut19avpfl07q590hsgl3b3y"

}

module.exports = function (urllib) {
    if (!urllib) throw "No urllib module found"

    function getMostPopularGames(num_of_res, processResponse) {
        urllib.request(base_api_url+'/games', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': credentials.client_id,
                'Authorization': `Bearer${credentials.access_token}`
            },
            data:`fields name, total_rating, follows;where follows > 0; sort follows desc;`
        }, processResponse)
    }

    function getGameByName(name, processResponse) {
        urllib.request(base_api_url+'/games', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': credentials.client_id,
                'Authorization': `Bearer ${credentials.access_token}`
            },
            data:`fields name, genres, total_rating, follows; where name = ${name};`
        }, processResponse)
    }

    return {
        getMostPopularGames: getMostPopularGames,
        getGameByName: getGameByName
    }

}

