const { Sequelize } = require('sequelize')

module.exports = new Sequelize(
    process.env.DB_NAME, // Name of Database
    process.env.DB_USER, // username
    process.env.DB_PASSWORD, // password
    // Info about DB
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
    }
)