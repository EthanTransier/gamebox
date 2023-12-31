const mongoose = require('mongoose');
const UserSchema  = new mongoose.Schema({
    first_name :{
        type  : String,
        required : true
    } ,
    last_name :{
        type  : String,
        required : true
    } ,
    email :{
        type  : String,
        required : true,
        unique : true,
    } ,
    password :{
        type  : String,
        required : true
    } ,
    date :{
        type : Date,
        default : Date.now
    },
    games_played :{
        type : Number,
        required : true,
        default : 0
    },
    games_won :{
        type : Number,
        required : true,
        default : 0
    },
    win_streak :{
        type : Number,
        required : true,
        default : 0
    },
    highest_win_streak :{
        type : Number,
        required : true,
        default : 0
    }
},{collection : 'Users'});
const User= mongoose.model('User',UserSchema);

module.exports = User;