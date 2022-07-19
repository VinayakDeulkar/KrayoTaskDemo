const express = require('express')
const app = express();
const PORT = 8080
const cors = require('cors')
const userRoutes = require('./Routes/userRoutes.js')
require('dotenv').config()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/api/user', userRoutes)
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})