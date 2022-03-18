const router = require('express').Router();

router.route('/').get().post();

router.route('/:thoughtid').get().put().delete()

router.route('/:thoughtid/reactions/').post().delete()

module.exports = router;
