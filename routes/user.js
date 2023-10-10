const express = require('express');
const router = express.Router();

const {getUsers} = require('../controllers/user-controller');

router.get('/user', getUsers);

module.exports = router;