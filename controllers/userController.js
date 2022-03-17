const { User } = require("../models");
const { populate } = require("../models/User");

const userController = {
// get all Users
getAllUsers(req, res) {
    User.find()
    .then(data => res.json(data))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
},
  // get one User
  getUserById(req, res) {
    User.findOne({
        _id: req.params.id
    })
      .select('-__v')
    // .populate('thoughts')
  //   .populate('friends')
      .then(data => res.json(data))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    },
    
  
  // // create new User
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
  
  // update user by id
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

  // delete user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: "No user found with this ID" });
        }
        res.json(data);
      })
      .catch((err) => res.status(400).json(err));
  },
};

  module.exports = userController;