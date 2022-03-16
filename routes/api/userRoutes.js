const router = require('express').Router();
const { User } = require('../../models');

// The `/api/users` endpoint

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

// Set up GET all and POST at /api/users
router.route("/").get(getAllUsers)
// .post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
router.route("/:id").get(getUserById)
// .put(updateUser).delete(deleteUser);

// Add and delete a friend
// router.route("/:id/friends/:friendsId").post(addFriend).delete(removeFriend);

module.exports = router;