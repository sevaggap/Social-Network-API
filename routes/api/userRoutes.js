const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
  } = require('../../controllers/userController.js');

router.route('/').get(getUsers).post(createUser);

router.route('/:userid').get(getSingleUser).put(updateUser).delete(deleteUser)

router.route('/:userid/friends/:friendid').post(addFriend).delete(deleteFriend)

module.exports = router;
