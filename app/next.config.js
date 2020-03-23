const withPlugins = require('next-compose-plugins');

const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
const withAutoprefixer = require('autoprefixer')

require('dotenv').config()

module.exports = withPlugins([
    withSass,
    withCSS,
    withAutoprefixer,
    {
        publicRuntimeConfig: {
            appId: process.env.APP_ID,
            host: process.env.HOST,
            restAPIKey: process.env.REST_API_KEY,
            nodeEnv: process.env.NODE_ENV,
        },
    },
]) 
