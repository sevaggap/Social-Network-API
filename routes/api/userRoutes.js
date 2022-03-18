const router = require('express').Router();

router.route('/').get().post();

router.route('/:userid').get().put().delete()

router.route('/:userid/friends/:friendid').post().delete()

module.exports = router;
