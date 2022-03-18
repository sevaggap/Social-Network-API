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
        User.findOne({_id: req.params.userId})
        .select('-__v')
        .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user found with that ID'})
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err))
    },

    // create a new user
    createUser(req,res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err))
    },
    
    // update an existing user 
    updateUser(req,res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
          )
            .then((user) =>
              !user
                ? res.status(404).json({ message: 'No user with this id!' })
                : res.json(user)
            )
            .catch((err) => {
              console.log(err);
              res.status(500).json(err);
            });
    },

    // delete an existing user
    deleteUser(req,res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : Thought.deleteMany({ _id: { $in: user.thoughts } })
        )
        .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
        .catch((err) => res.status(500).json(err));
    },

    // add a friend
    addFriend(req,res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
          )
          .then((user) =>
          !user
            ? res.status(404).json({
                message: 'No friend found with that ID',
              })
            : res.json('Friend Added 🎉')
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          }
        )
    },

    // delete a friend
    deleteFriend(req,res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
          )
          .then((user) =>
          !user
            ? res.status(404).json({
                message: 'No friend found with that ID',
              })
            : res.json('Friend Deleted 🎉')
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          }
        )
    }
};