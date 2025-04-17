const express = require('express');
const router = express.Router();
const playlistControllers = require('../controllers/playlistControllers');

router.get('/:user/playlists', playlistControllers.getPlaylists);

module.exports = router;