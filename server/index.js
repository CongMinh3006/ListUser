const initRoutes = require("./routes/index")
require("dotenv").config()
const cors = require("cors")
const connectDB = require("./config/connectDB")
const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

connectDB()
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

initRoutes(app)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});