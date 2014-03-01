var passport        = require('passport')
  , LocalStrategy   = require('passport-local').Strategy
  , userProvider    = require('./userProvider')

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log('~~~~~> authing')
        console.log('u: %s\np: %s', username, password)

        var user = userProvider.getUser(username)

        if (typeof user === 'undefined')
            return done(null, false, {message: 'Nobody here by that name'})

        if (password !== user.password)
            return done(null, false, {message: 'That is not what we agreed on'})

        return done(null, user)  
    } 
))

passport.serializeUser(function(user, done) {
    done(null, user.username)
})

passport.deserializeUser(function(username, done) {
    done(null, userProvider.getUser(username)) 
})

module.exports = passport
