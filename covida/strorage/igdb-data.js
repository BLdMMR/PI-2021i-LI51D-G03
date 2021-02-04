const base_api_url = "https://api.igdb.com/v4"
const credentials = {
    access_token: "mbp82xakas6q4957cxiir5sl3ynml3",
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

        for(i = 0; i < data.length; ++i) {
            
            data[i].game_img1 = await getImageUrl(data[i].id)

            data[0].first = true
            console.log(data[i].game_img1)
        }

        return data;
    }

    async function searchGame(id) {
        console.log(id)
        const response = await fetch(base_api_url+'/games', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': credentials.client_id,
                'Authorization': `Bearer ${credentials.access_token}`
            },
            body:`fields id, name, total_rating, genres; search "${id}";`
        })

        const data = await response.json();
        if (!data || data.length === 0) {
            throw new userException("Unable to find game", 502)
        }
        console.log(data)
        for(i = 0; i < data.length; ++i) {
            
            data[i].game_img1 = await getImageUrl(data[i].id)

            data[0].first = true
            console.log(data[i].game_img1)
        }

        return data;
    }

    async function getGameDetails(id) {
        const response = await fetch(base_api_url+'/games', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': credentials.client_id,
                'Authorization': `Bearer ${credentials.access_token}`
            },
            body:`fields id, name, total_rating, genres; where id = ${id};`
        })

        const data = await response.json();

        if (!data) {
            return Promise.reject({
                message: "Couldn't find a game with such id",
                statusCode: 404
            })
        }

        data[0].game_img1 = await getImageUrl(data[0].id)
        
        return data;

    }

    async function getImageUrl(gameId){
        let img = await fetch(`${base_api_url}/covers`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': credentials.client_id,
                'Authorization': `Bearer ${credentials.access_token}`,
            },
            body: `fields url;where game = ${gameId};`
        })
        let imgJson = await img.json()
        return imgJson[0]?  imgJson[0].url: "https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png" 
    } 

    return {
        getMostPopularGames: getMostPopularGames,
        searchGame: searchGame,
        getGameDetails: getGameDetails
    }

}

