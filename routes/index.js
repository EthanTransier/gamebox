const express = require('express');
const router = express.Router()
const {ensureAuthenticated} = require('../config/auth')

// brings the user to the home page
router.get('/', function (req, res){
    res.render('pages/welcome')
})

// router.get('/register', (req, res)=>{
//     res.render('register')
// })

// when the user goes to the dashboard or the game page, it ensures that the user is authenticated (logged in), and then gets the current user from the req.user, and puts that into the dashboard or game page so the EJS can build the page around them
router.get('/dashboard', ensureAuthenticated, (req, res)=>{
    res.render('pages/dashboard', {
        user:req.user
    })
})

router.get('/game', ensureAuthenticated, (req, res)=>{
    res.render('pages/game', {
        user:req.user
    })
})

module.exports = router;