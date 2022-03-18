const { User, Thought } = require('../models');

module.exports = {
    // get all the thoughts
    getThoughts(req,res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },

    // get one thought 
    getSingleThought(req,res) {
        Thought.findOne({_id: req.params.thoughtId})
        .select('-__v')
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought found with that ID'})
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err))
    },

    // create a new thought
    createThought(req,res) {
        Thought.create(req.body)
        .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
        })
        .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Thought created, but found no user with that ID',
            })
          : res.json('Created the Thought 🎉')
        )
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
    },
    
    // update an existing thought
    updateThought(req,res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
          )
            .then((thought) =>
              !user
                ? res.status(404).json({ message: 'No thought with this id!' })
                : res.json(thought)
            )
            .catch((err) => {
              console.log(err);
              res.status(500).json(err);
            });
    },

    // delete an existing thought
    deleteThought(req,res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : User.findOneAndUpdate(
             {thoughts: req.params.thoughtId},
             { $pull: {thoughts: req.params.thoughtId} },
             { new: true}
            )
        )
        .then(() => res.json('Thought and associated reactions deleted!' ))
        .catch((err) => res.status(500).json(err));
    },

    // add a reaction
    addReaction(req,res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
          )
          .then((user) =>
          !user
            ? res.status(404).json({
                message: 'No thought found with that ID',
              })
            : res.json('Reaction Added 🎉')
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          }
        )
    },

    // delete a reaction
    deleteReaction(req,res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { new: true }
          )
          .then((thought) =>
          !thought
            ? res.status(404).json({
                message: 'No thought found with that ID',
              })
            : res.json('Reaction Deleted 🎉')
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          }
        )
    }
};