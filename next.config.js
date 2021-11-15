require('dotenv').config()

module.exports = {
    reactStrictMode: true,
    env: {
        MONGO_URI: process.env.MONGO_URI,
        PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
        CLOUD_NAME: process.env.CLOUD_NAME,
        CLOUD_API_KEY: process.env.CLOUD_API_KEY,
        CLOUD_API_SECRET: process.env.CLOUD_API_SECRET,
        NAME: process.env.NAME,
        PASSWORD: process.env.PASSWORD,
        JWT_SECRET: process.env.JWT_SECRET,
    },
    images: { domains: ['res.cloudinary.com'] },
}