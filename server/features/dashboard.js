const router = require('express').Router();
const axios = require('axios');

router.get('/', async (req, res) => {
    const accessToken = req.query.access_token;
    // const refreshToken = req.query.refresh_token;

    if (!accessToken ) {
        return res.status(400).json({ error: 'No access token or refresh token provided' });
    }

    const userInfo = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    console.log(userInfo);

    res.json(userInfo.data);
});

module.exports = router;