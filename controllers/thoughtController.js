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
          { _id: req.body.userId },
          { $addToSet: { thought: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'Post created, but found no user with that ID' })
          : res.json('Created the post 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

};

  module.exports = thoughtController;