const { Thought, User } = require("../models");

const thoughtController = {

// get all thoughts
getAllThoughts(req, res) {
    Thought.find()
    .then(data => res.json(data))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
},
  // get one thought
  getThoughtById(req, res) {
    Thought.findOne({
        _id: req.params.id
    })
      .then(data => res.json(data))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    },
  
  // create new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.id },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'Post created, but no user found with that ID' })
          : res.json('Created the post 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // update a thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: "No thought found with this ID" });
        }
        res.json(data);
      })
      .catch((err) => res.status(400).json(err));
  },

    // delete a thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
          .then((data) => {
            if (!data) {
              res.status(404).json({ message: "No thought found with this ID" });
            }
            res.json(data);
          })
          .catch((err) => res.status(400).json(err));
      },

      //add a reaction
      addReaction({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId },
          {$addToSet: { reactions: body } },
          { new: true }
        )
        .then((data) => {
            if (!data) {
              res.status(404).json({ message: "No reaction found with this id" });
            }
            res.json(data);
          })
          .catch((err) => res.json(err));
      },
    
      //remove a reaction
      removeReaction({ params }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId },
          { $pull: { reactions: { reactionId: params.reactionId} } },
          { new: true }
        )
          .then((data) => {
            if (!data) {
              res.status(404).json({ message: "No reaction found with this ID" });
            }
            res.json(data);
          })
          .catch((err) => res.status(400).json(err));
      },

};

  module.exports = thoughtController;