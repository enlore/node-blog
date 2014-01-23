var passport        = require('passport')
  , LocalStrategy   = require('passport-local').Strategy

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log('~~~~~> authing')
        console.log('u: %s\np: %s', username, password)

        if (username !== 'enlore') {
            console.log('~~~~~> bad username')
            return done(null, false, {message: 'Nobody here by that name'})
        }

        if (password !== 'butts') {
            console.log('~~~~~> bad pass')
            return done(null, false, {message: 'That is not what we agreed on'})
        }

        console.log('~~~~~> logged in!')
        return done(null, {username: 'enlore', id: 1})  
    } 
))

passport.serializeUser(function(user, done) {
    done(null, user.id)
})

passport.deserializeUser(function(id, done) {
    done(null, {username: 'enlore', id: id}) 
})

module.exports = passport
