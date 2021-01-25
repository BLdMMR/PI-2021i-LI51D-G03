'use strict'

module.exports = function (fetch, esUrl) {
      if (!fetch) throw "No fetch module found"

      async function getUser(username) {
            const fetchedRes = await fetch(`${esUrl}/users/_search`)
            const result = await fetchedRes.json()

            if (result.hits.hits.length > 0) {
                  let user = result.hits.hits.find(element => element._source.username === username)
                  return user
            }
            else return null
      }

      function hasReadableCharacters(groupName) {
            return groupName.trim().length !== 0
      }

      async function createUser(username, password) {
            console.log("username: ", username)
            if (!username && !password && !(hasReadableCharacters(username))) 
                  return Promise.reject(
                        {message: 'Username or password invalid', statusCode: 400}
                  )
            if (username === getUser(username).username)
                  return Promise.reject(
                        {message: 'Username already in use', statusCode: 400}
                  )
            const fetchedRes = await fetch(`${esUrl}/users/_doc`, {
                  method:'POST',
                  headers:{'Content-Type': 'application/json'},
                  body: JSON.stringify({username: username, password: password})
            })

            const result = await fetchedRes.json()
            return !result ? Promise.reject({message: 'Unable to create user', statusCode: 500}) : result 
      }

      return {
            getUser: getUser,
            createUser: createUser
      }
}