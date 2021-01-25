'use strict'

const express = require('express')

module.exports = function (services){
      if (!services) throw 'No services module found'

      const router = express.Router()

      router.get('/login', loginPage)
      router.post('/login', loginRequest)
      router.get('/logout', logoutRequest)
      router.post('/register', register)
      router.get('/register', registerPage)

      return router

      function loginPage(req, rsp) {
            rsp.render('login')
      }

      function loginRequest(req, rsp) {
            const givenCredentials = req.body

/*             console.log('Random: ', services.verifyLoginCredentials(givenCredentials)) */            services.verifyLoginCredentials(givenCredentials)
            services.verifyLoginCredentials(givenCredentials)
            .then(status => {
                  console.log(status)
                  console.log(givenCredentials)
                  if (status.validCredentials) 
                        req.login( {username: givenCredentials.username, password: givenCredentials.password}, (err) => rsp.redirect('/site/home'))
                  else 
                        rsp.render('login', {warning: status.error, username: givenCredentials.username})

            })
            /* console.log("status", status)
            if (status.validCredentials) req.login( {username: givenCredentials.username, password: givenCredentials.password}, (err) => rsp.redirect('/site/home'))
            else rsp.render('login', {warning: status.error, username: givenCredentials.username})
 */
            
            
            
      }

      function logoutRequest(req, rsp) {
            req.logout()
            rsp.redirect('users/login')
      }

      function register(req, rsp) {
            const userCredentials = req.body
            services.createUser(userCredentials)
            .then(() => {
                  req.login({username: userCredentials.username, password: userCredentials.password}, (err) => rsp.redirect('/site/home'))
                  rsp.redirect('/site/groups')
            })
            .catch(err => {
                  if (err.statusCode && err.message) rsp.status(err.statusCode).json(err.message)
                  else {
                        console.log(err)
                        rsp.status(400).json('Something Happened')
                  }
            })
      }

      function registerPage(req, rsp) {
            rsp.render('signUp')
      }
}