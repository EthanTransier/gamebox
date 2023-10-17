const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Local strategy for encrypting and decrypting passwords when loging in the user
module.exports = function(passport){
    console.log('running passport')
    passport.use(
        new LocalStrategy({usernameField: "email", passwordField: 'password', passReqToCallback:false, session:true}, (email,password,done)=> {
            console.log('Local Strat Works')
            User.findOne({email: email})
            .then((user)=>{
                if(!user){
                    return done(null, false, {message: 'that email is not registered'})
                }

                // match pass
                bcrypt.compare(password, user.password, (err, isMatch)=>{
                    if(err) {throw err;}

                    if(isMatch) {
                        console.log(email + " " + password)
                        console.log(user)
                        return done(null, user)
                    }else {
                        return done(null, false, {message: 'pass incorrect'})
                    }
                })
            })
            .catch((err) => {
                return done(err, false, { message: 'An error occurred' });
            });
        })
    )

    // user is stored in the req.user, so it knows that you are logged in at the moment
    // used to create session based programs
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id).then((err, user)=>{
            done(user, err)
        }).catch((err)=>{
            done(err, null)
        })
    })

}