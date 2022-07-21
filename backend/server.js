require('dotenv').config()
const express = require('express')
const cookieSession = require("cookie-session")
const cors = require('cors')
const userRoutes = require('./Routes/userRoutes.js')
const authRoutes = require('./Routes/authRoutes')
const passportStrategy = require("./passport")
const passport = require("passport");
const app = express();
const PORT = 8080


app.use(
    cookieSession({
        name: "session",
        keys: ["Rock"],
        maxAge: 24 * 60 * 60 * 100,
    })
)

app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})