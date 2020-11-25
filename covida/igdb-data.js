const base_api_url = "https://api.igdb.com/v4"
const creds = {
    access_token: "4fa2e2xd03b9slsfjacex2yfo9xmbe",
    expires_in: 5462024,
    token_type: "bearer",
    client_id : "kul61h0ut19avpfl07q590hsgl3b3y"

}

module.exports = function (urllib) {
    if (!urllib) return "No urllib module found"

    function getMostPopularGames(num_of_res, cb) {
        console.log('banana')
        urllib.request(base_api_url+'/games', {
            method: 'POST',
            headers: {
                'Client-ID': creds.client_id,
                'Authorization': `Bearer ${creds.access_token}`
            },
            data:`fields name, genres, total_rating, follows; sort follows desc; limit ${num_of_res};`
        }, cb)
    }

    function getGameByName(name) {
        urllib.request(base_api_url+'/games', {
            method: 'POST',
            headers: {
                'Client-ID': creds.client_id,
                'Authorization': `Bearer ${creds.access_token}`
            },
            data:`fields name, genres, total_rating, follows; where name = ${name};`
        }, cb)
    }

    return {
        getMostPopularGames: getMostPopularGames,
        getGameByName: getGameByName
    }

}

