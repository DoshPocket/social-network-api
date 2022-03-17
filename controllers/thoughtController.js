const { Thought, User } = require("../models");

const thoughtController = {
// get all Thoughts
getAllThoughts(req, res) {
    Thought.find()
    .then(data => res.json(data))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
},
  // get one Thought
  getThoughtById(req, res) {
    Thought.findOne({
        _id: req.params.id
    })
  //   .populate('user')
  //   .populate('friends')
      .then(data => res.json(data))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    },
  
  // // create new Thought
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

  // update thought
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

    // delete thought
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

};

  module.exports = thoughtController;