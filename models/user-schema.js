//defined mongoose and required it
const mongoose = require('mongoose');

//defined User Schema
const userSchema = new mongoose.Schema({
  id: { 
    type: Number,   
    required: true,
    trim: true 
  },
  email:{
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  username:{
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password:{
    type: String,
    required: true,
    trim: true
  },
  gamesWon:{
    type: Number,
    required: true,
  }

  },{ collection: 'User' }
);

module.exports = mongoose.model('User', userSchema);