const path = require("path");

module.exports = Object.freeze({
    JWT_SECRET: "shhhhh",
    COOKIE_NAME: "auth_token",
    REDIRECT_URI: '/auth/google',
    DB_NAME: "shopping",
    PRODUCT_TABLE: "products",
    UPLOAD_DIR: path.join(__dirname, '..', 'upload'),
    UPLOAD_AUDIO_DIR: path.join(__dirname, '..', 'upload/audio'),
})