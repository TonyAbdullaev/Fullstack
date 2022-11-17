require('dotenv').config()
// require импортирует модули или файлы...
const express = require('express')

const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler =require('./middleware/ErrorHandlingMiddleware');
const path = require('path')

const PORT = process.env.PORT || 5000;

//Объект с которого начинается проект
const app = express();
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
// Middleware that we use to deal with errors must be last one. Because
// It's last one and after this we don't have other actions


const start = async () => {
    try {
        await sequelize.authenticate(); // install contact to db
        await sequelize.sync()  // compare DB with data schema
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()


