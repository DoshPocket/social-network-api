const { User } = require("../models");

const userController = {

// get all users
getAllUsers(req, res) {
    User.find()
    .then(data => res.json(data))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
},

  // get one user
  getUserById(req, res) {
    User.findOne({
        _id: req.params.id
    })
      .select('-__v')
      .then(data => res.json(data))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    },
    
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((User) => {
        res.status(200).json(User);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  
  // update a user by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: "No user found with this ID" });
        }
        res.json(data);
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete a user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: "No user found with this ID" });
        }
        res.json(data);
      })
      .catch((err) => res.status(400).json(err));
  },

  // add a friend
  addFriend({ params }, res) {
    User.findOneAndUpdate({ _id: params.id },
      {$addToSet: { friends: params.friendId } },
      { new: true }
    )
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
  },

  // remove a friend
  removeFriend({ params }, res) {
    User.findOneAndUpdate({ _id: params.id },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: "No user found with this ID" });
        }
        res.json(data);
      })
      .catch((err) => res.status(400).json(err));
  }
  
};

  module.exports = userController;