const base_api_url = "https://api.igdb.com/v4"
const creds = {
    access_token: "4fa2e2xd03b9slsfjacex2yfo9xmbe",
    expires_in: 5462024,
    token_type: "bearer",
    client_id : "kul61h0ut19avpfl07q590hsgl3b3y"

}

module.exports = function (urllib) {
    if (!urllib) return "No urllib module found"

    function getMostPopularGames(cb) {
        console.log('banana')
        urllib.request(base_api_url+'/games', {
            method: 'POST',
            headers: {
                'Client-ID': creds.client_id,
                'Authorization': 'Bearer ' + creds.access_token
            }
        },cb)
    }

    return {
        getMostPopularGames: getMostPopularGames
    }

}

