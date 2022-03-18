const { User, Thought } = require('../models');

module.exports = {
    // get all the users
    getUsers(req,res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },

    // get one user 
    getSingleUser(req,res) {

    },

    // create a new user
    createUser(req,res) {

    },
    
    // update an existing user 
    updateUser(req,res) {

    },

    // delete an existing user
    deleteUser(req,res) {

    },

    // add a friend
    addFriend(req,res) {

    },

    // delete a friend
    deleteFriend(req,res) {

    }
};