const base_api_url = "https://api.igdb.com/v4"
const credentials = {
    access_token: "4fa2e2xd03b9slsfjacex2yfo9xmbe",
    expires_in: 5462024,
    token_type: "bearer",
    client_id : "kul61h0ut19avpfl07q590hsgl3b3y"

}

module.exports = function (fetch, userException) {
    if (!fetch) throw 'No fetch module found'

    async function getMostPopularGames() {

        const response = await fetch(`${base_api_url}/games`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': credentials.client_id,
                'Authorization': `Bearer ${credentials.access_token}`,
            },
            body: `fields name, total_rating, follows;where follows > 0; sort follows desc;`
        })
        const data = await response.json()
        if (data.length === 0) {
            throw new userException("No popular games found", 502)
        }

        return data;
    }

    async function searchGame(id) {
        const response = await fetch(base_api_url+'/games', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': credentials.client_id,
                'Authorization': `Bearer ${credentials.access_token}`
            },
            body:`fields name, genres, total_rating, follows; where id = ${id};`
        })

        const data = await response.json();
        if (!data) {
            throw new userException("Unable to find game", 502)
        }
        return data;
    }

    return {
        getMostPopularGames: getMostPopularGames,
        searchGame: searchGame
    }

}

