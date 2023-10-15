const express = require('express');
const router = express.Router()
const {ensureAuthenticated} = require('../config/auth')

router.get('/', function (req, res){
    res.render('pages/welcome')
})

// router.get('/register', (req, res)=>{
//     res.render('register')
// })

router.get('/dashboard', ensureAuthenticated, (req, res)=>{
    console.log("this is the user "+ req.user)
    res.render('pages/dashboard', {
        user:req.user
    })
})

module.exports = router;