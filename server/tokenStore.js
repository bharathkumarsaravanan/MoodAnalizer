const tokens = {};

function getToken(userId) {
    return tokens[userId];
}

function setToken(userId, accessToken, refreshToken) {
    tokens[userId] = {
        accessToken,
        refreshToken
    };
}

module.exports = {
    getToken,
    setToken
};