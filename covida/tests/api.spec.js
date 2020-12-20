'use strict'
const frisby = require('frisby')
const base = 'http://localhost:8080/'
const Joi = frisby.Joi

test('verify covida-server server s running', function() {
    return frisby.get(`${base}api`)
        .expect('status', 200)
        .expect('jsonTypes', {
            name: 'Chelas Open Videogame Application',
            version: '1.0.0',
            description: 'PI Project Application'
        })
})

describe('most popular games', function () {
    test('should get the most popular games from igdb', function () {
        return frisby.get(`${base}popular`)
            .expect('status', 200)
            .expect('jsonTypes', '*', {
                id: Joi.number().required(),
                follows: Joi.number().required(),
                name: Joi.string().required(),
                total_rating: Joi.number()
            })
    })
});

describe('game by name', function () {
    test('should get the info about a specific game', function () {
        return frisby.get(`${base}search/1020`)
            .expect('status', 200)
            .expect('jsonTypes', '*', {
                id: 1020,
                follows: Joi.number().required(),
                genres: Joi.array().required(),
                name: "Grand Theft Auto V",
                total_rating: Joi.number()
            })
    })
})

describe('all groups', function () {
    test('should get all the groups stored', function () {
        return frisby.get(`${base}api/groups`)
            .expect('status', 200)
            .expect('jsonTypes', '*', {
                name: Joi.string().required(),
                description: Joi.string(),
                number_of_games: Joi.number().required()
            })
    })
});

describe('specific group', function () {
    test('should get info of a specific group', function () {
        return frisby.get(`${base}api/groups/0/`)
            .expect('status', 200)
            .expect('jsonTypes', {
                id: Joi.number().required(),
                name: Joi.string().required(),
                description: Joi.string(),
                games: Joi.array().required()
            })
    })
});

describe('group that does not exist', function () {
    test('Should return 404: No Group in database', function () {
        return frisby.get(`${base}api/groups/23/`)
            .expect('status', 404)
            .expect('jsonTypes', Joi.string().required())
    })
})

describe('games from group based on rating', function () {
    test('Should return a list of games with total_rating within min and max', function () {
        return frisby.get(`${base}api/groups/1/games?min=90&max=93`)
            .expect('status', 200)
            .expect('jsonTypes', '*', {
                id: Joi.number().required(),
                name: Joi.string().required(),
                follows: Joi.number().required(),
                total_rating: Joi.number()
            })
    })
})

describe('games from group based on rating with values reversed', function () {
    test('Should return a message about min and max', function () {
        return frisby.get(`${base}api/groups/0/games?min=90&max=70`)
            .expect('status', 400)
            .expect('jsonTypes', Joi.string().required())
    })
})


describe('create group that does not exist', function () {
    test('Should return the created group', function () {
        return frisby.post(`${base}api/groups/`, {
            name: "FPS Games",
            description: "A group of first person shooters"
        })
            .expect('status', 201)
            .expect('jsonTypes',{
                id: Joi.number().required(),
                name: Joi.string().required(),
                description: Joi.string(),
                games: Joi.array().required()
            } )
    })
})

describe('create group that exists', function () {
    test('Should return a message about group already existing', function () {
        return frisby.post(`${base}api/groups/`, {
            name: "Best Games",
            description: "A group of first person shooters"
        })
            .expect('status', 201)
            .expect('jsonTypes',{
                id: Joi.number().required(),
                name: Joi.string().required(),
                description: Joi.string(),
                games: Joi.array().required()
            } )
    })
})

describe('add game to a group', function () {
    test('Should return the list of games of the group', function () {
        return frisby.put(`${base}api/groups/1/games`, {
            id: 71,
            follows: 886,
            name: "Portal",
            total_rating: 83.5387723872896
        })
            .expect('status', 201)
            .expect('jsonTypes',{
                id: Joi.number().required(),
                name: Joi.string().required(),
                description: Joi.string(),
                games: Joi.array().required()
            } )
    })
})

describe('add an existing game to a group', function () {
    test('Should return a message of error', function () {
        return frisby.put(`${base}api/groups/1/games`, {
            id: 71,
            follows: 886,
            name: "Portal",
            total_rating: 83.5387723872896
        })
            .expect('status', 400)
            .expect('jsonTypes', Joi.string().required())
    })
})

describe('remove game from a group', function () {
    test('Should return the list of games of the group', function () {
        return frisby.put(`${base}api/groups/1/games/71`)
            .expect('status', 200)
            .expect('jsonTypes', Joi.object().required())
    })
})

describe('remove an non-existing game from a group', function () {
    test('Should return the list of games of the group', function () {
        return frisby.put(`${base}api/groups/1/games/71`)
            .expect('status', 404)
            .expect('jsonTypes', Joi.string().required())
    })
})

describe('update a group', function () {
    test('Should return the group', function () {
        return frisby.put(`${base}api/groups/1`, {
            name: "Portals",
            description: "The list of the Portal games and other great ones"
        })
            .expect('status', 200)
            .expect('jsonTypes',{
                id: Joi.number().required(),
                name: Joi.string().required(),
                description: Joi.string(),
                games: Joi.array().required()
            } )
    })
})

describe('update a group that does not exist', function () {
    test('Should return the group', function () {
        return frisby.put(`${base}api/groups/25`, {
            name: "Portals",
            description: "The list of the Portal games and other great ones"
        })
            .expect('status', 404)
            .expect('jsonTypes', Joi.string().required())
    })
})