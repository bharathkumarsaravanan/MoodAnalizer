const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');


router.get('/:id/details', userControllers.getUser);
router.get('/:id/logout', userControllers.logoutUser);
router.get('/auth/spotify', userControllers.getAccessToken); 

module.exports = router;