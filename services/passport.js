const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user)
        })
})

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: 'https://emailly1000.herokuapp.com/auth/google/callback',
    
}, (accessToken, refreshToken, profile, done) => {

    User.findOne({googleId: profile.id})
        .then((existingUser) => {
            if(existingUser){
                //we already have a record with the given user id
                done(null, existingUser)
            } else {
                //we are going to make new cord
                new User({googleId: profile.id})
                .save()
                .then( user => done(null, user))
            }
        })
   
   

}))