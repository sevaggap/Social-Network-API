const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
  } = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtid').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtid/reactions/').post(addReaction).delete(deleteReaction);

module.exports = router;
