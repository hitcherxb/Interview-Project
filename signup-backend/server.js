const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const cors = require('cors')
const { errorHandler, notFound } = require('./middlewares/errorMiddleware')

app.use(express.json())
dotenv.config()
app.use(cors())


mongoose.connect(process.env.DATABASE_ACCESS, { useFindAndModify: false }, () => console.log("Database Connected"))

//Route to userRoutes 
app.use('/api/users', userRoutes)
//Route to postRoutes
app.use('/api/post', postRoutes)


app.use(notFound)
app.use(errorHandler)


app.listen(4000, () => console.log("server is up and running"))

