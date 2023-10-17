const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');

// if they go to users/login, it will take them to the login page
router.get('/login', (req, res)=>{
    res.render('pages/login');
})

// if they go to users/register, it will take them to the register page
router.get('/register', (req, res)=>{
    res.render('pages/register')
})

// This will create the user, using the data from the register page
router.post('/register', (req, res)=>{
    // All the data from the register page
    const {first_name, last_name, email, password, password2} = req.body;
    // Error array that will hold all the errors, if their are any
    let errors = [];

    // if the user didn't fill out any of the fields when registering
    if(!first_name || !last_name || !email || !password || !password2){
        errors.push({msg: "Please fill in all fields"})
    }
    // check if the first password and if the second password match
    if(password !== password2){
        errors.push({msg: "Passwords do not match"})
    }

    // check if password is less than 6 characters
    if(password.length < 6){
        errors.push({msg: "Password needs to be at least 6 characters"})
    }

    // Checks if any errors have occured, which are stored in the errors arrays
    if(errors.length > 0){
        
        res.render('pages/register', {
            errors: errors,
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password
        })
    } else {
        // will try to find a user that uses the email that the user put into the register page, if their are any uses of it it means that the email has already been used
        User.findOne({email: email}).then((user, err)=>{
            if(user){
                // if it finds the user, it errors and says that the email has already been registered, so the user can't create an account
                errors.push({msg: "This email has aleady been registered"})
                console.log(errors)
                res.render('pages/register', {
                    errors: errors,
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    password: password,
                    password2 : password2
                })
            } else {
                // Creates the new user object using the user schema
                const newUser = new User({
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    password: password
                })
                // Encrypts the user's password
                bcrypt.genSalt(10, (err, salt)=>
                bcrypt.hash(newUser.password,salt,
                    ((err,hash)=> {
                        if(err) throw err;
                        // save pass to hash
                        newUser.password = hash
                        // saves the user to mongodb with the new encrypted password using mongoose
                        newUser.save()
                        .then((value)=>{
                            // brings the user to the login page after they have successfully created an account
                            req.flash('success_msg', 'You have onw registered!')
                            res.redirect('/users/login')
                        })
                        .catch(value=> console.log(value))
                    })
                    )
                )
            }
        })
    }
})

// when the user tries to login, it will authenticate them and log them in using passport
router.post('/login', (req,res,next)=>{
    passport.authenticate('local',{
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true,
    })(req,res,next);
})

// logouts the user using passport
router.get('/logout', (req, res)=>{
    req.logout(function(err){
        if(err) {return next(err)}
    })
    // brings the user back the home page after they logout
    res.redirect('/')
})

// adds a game played to the user using their email passed through the parameters
router.post('/addGame/:email', async (req, res) => {
    // gets the email of the current user from the parameters
    const {email} = req.params; 

    try {
        // Finds the current user using the email
        const currentUser = await User.findOne({ email: email });
        // if its able to find the current user, it adds one to their games played
        if (currentUser) {
            // gets the current user's games played and adds one to that number
            const newScore = Number(currentUser.games_played) + 1;
            // updates the current user that has the email from the parameters, and makes their games played the new score defined above
            await User.findOneAndUpdate({email: email}, {games_played: newScore})
            res.json(newScore);
        } else {
            // If the user cannot be found
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        // server issue with the pathway
        res.status(500).json({ error: 'Internal server error' });
    }
});

// adds a game won to the user using their email passed through the parameters
router.post('/winGame/:email', async (req, res) => {
    // Finds the current user using the email
    const {email} = req.params;
    
    try {
        // gets the current user's games won and adds one to that number
        const currentUser = await User.findOne({ email: email });
        // if its able to find the current user, it adds one to their games won
        if (currentUser) {
            // gets the current user's games won and adds one to that number
            const newScore = Number(currentUser.games_won) + 1;
            // updates the current user that has the email from the parameters, and makes their games won the new score defined above
            await User.findOneAndUpdate({email: email}, {games_won: newScore})
            res.json(newScore);
        } else {
            // If the user cannot be found
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        // server issue with the pathway
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;