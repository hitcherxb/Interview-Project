const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoutes = require('./routes/userRoutes')
const cors = require('cors')
const { errorHandler, notFound } = require('./middlewares/errorMiddleware')

app.use(express.json())
dotenv.config()
app.use(cors())


mongoose.connect(process.env.DATABASE_ACCESS, () => console.log("Database Connected"))







app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
    res.send('API is running..');
});

app.get('/api/profile', (req, res) => {
    console.log(req)
    res.json("profile");
});



app.use(notFound)
app.use(errorHandler)


app.listen(4000, () => console.log("server is up and running"))

