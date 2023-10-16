const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');

router.get('/login', (req, res)=>{
    const cssPath = '../styles/css/style.css';
    res.render('pages/login', { cssPath });
})
router.get('/register', (req, res)=>{
    const cssPath = '../styles/css/style.css';
    res.render('pages/register', { cssPath })
})

router.post('/register', (req, res)=>{
    const {first_name, last_name, email, password, password2} = req.body;
    let errors = [];
    console.log(first_name, last_name, email, password, password2)
    if(!first_name || !last_name || !email || !password || !password2){
        errors.push({msg: "Please fill in all fields"})
    }
    // check if match
    if(password !== password2){
        errors.push({msg: "Passwords do not match"})
    }

    // check if password is less than 6 characters
    if(password.length < 6){
        errors.push({msg: "Password needs to be at least 6 characters"})
    }

    if(errors.length > 0){
        res.render('pages/register', {
            errors: errors,
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password
        })
    } else {
        User.findOne({email: email}).then((err, user)=>{
            if(user){
                errors.push({msg: "This email has aleady been registered"})
                res.render('pages/register', {
                    errors: errors,
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    password: password
                }, { cssPath })
            } else {
                const newUser = new User({
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    password: password
                })

                bcrypt.genSalt(10, (err, salt)=>
                bcrypt.hash(newUser.password,salt,
                    ((err,hash)=> {
                        if(err) throw err;
                        console.log(newUser)
                        // save pass to hash
                        newUser.password = hash
                        console.log(newUser)
                        newUser.save()
                        .then((value)=>{
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

router.post('/login', (req,res,next)=>{
    console.log('test')
    passport.authenticate('local',{
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true,
    })(req,res,next);
    console.log('authenticated')
})

router.get('/logout', (req, res)=>{
    req.logout(function(err){
        if(err) {return next(err)}
    })
    res.redirect('/')
})

router.post('/addGame/:email', async (req, res) => {
    const {email} = req.params; // Assuming 'email' is a property in the request body

    try {
        const currentUser = await User.findOne({ email: email });

        if (currentUser) {
            // Assuming 'games_played' is a property of the 'User' model
            const newScore = Number(currentUser.games_played) + 1;
            // console.log(`The new score is ${newScore}`)
            await User.findOneAndUpdate({email: email}, {games_played: newScore})
            res.json(newScore);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/winGame/:email', async (req, res) => {
    const {email} = req.params; // Assuming 'email' is a property in the request body

    try {
        const currentUser = await User.findOne({ email: email });

        if (currentUser) {
            // Assuming 'games_played' is a property of the 'User' model
            const newScore = Number(currentUser.games_won) + 1;
            // console.log(`The new score is ${newScore}`)
            await User.findOneAndUpdate({email: email}, {games_won: newScore})
            res.json(newScore);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// User.findOneAndUpdate({email: email, games_played: currentUser.games_played+=1})
module.exports = router;