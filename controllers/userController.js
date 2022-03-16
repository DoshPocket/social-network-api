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
  //   .populate('Thoughts')
  //   .populate('friends')
      .then(data => res.json(data))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    },
  
  // // create new User
  // router.post('/', (req, res) => {
  //   User.create(req.body)
  //     .then((User) => {
  //     //   if (req.body.tagIds.length) {
  //     //     const UserTagIdArr = req.body.tagIds.map((tag_id) => {
  //     //       return {
  //     //         User_id: User.id,
  //     //         tag_id,
  //     //       };
  //     //     });
  //     //     return UserTag.bulkCreate(UserTagIdArr);
  //     //   }
  //       res.status(200).json(User);
  //     })
  //     // .then((UserTagIds) => res.status(200).json(UserTagIds))
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(400).json(err);
  //     });
  // });
  
  // // update User
  // router.put('/:id', (req, res) => {
  //   User.update(req.body, {
  //     where: {
  //       id: req.params.id,
  //     },
  //   })
  //     .then((User) => {
  //       return UserTag.findAll({ where: { User_id: req.params.id } });
  //     })
  //     .then((UserTags) => {
  //       const UserTagIds = UserTags.map(({ tag_id }) => tag_id);
  //       const newUserTags = req.body.tagIds
  //         .filter((tag_id) => !UserTagIds.includes(tag_id))
  //         .map((tag_id) => {
  //           return {
  //             User_id: req.params.id,
  //             tag_id,
  //           };
  //         });
  //       const UserTagsToRemove = UserTags
  //         .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
  //         .map(({ id }) => id);
  
  //       return Promise.all([
  //         UserTag.destroy({ where: { id: UserTagsToRemove } }),
  //         UserTag.bulkCreate(newUserTags),
  //       ]);
  //     })
  //     .then((updatedUserTags) => res.json(updatedUserTags))
  //     .catch((err) => {
  //       res.status(400).json(err);
  //     });
  // });
  
  // // delete by id
  // router.delete('/:id', (req, res) => {
  //   User.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   })
  //     .then(data => {
  //       if (!data) {
  //         res.status(404).json({ message: 'No User found with that ID.' });
  //         return;
  //       }
  //       res.json(data);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       res.status(500).json(err);
  //     });
  // });
};

  module.exports = userController;