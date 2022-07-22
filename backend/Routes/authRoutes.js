const express = require('express')
const router = express.Router();
const passport = require('passport')


router.get("/login/success", (req, res) => {
    if (req.user) {
        res.json({ error: false, message: "Log in Sucess", user: req.user })
    }
    else {
        res.json({ error: true, message: "Log in faik" })
    }
})


router.get("/login/failed", (req, res) => {
    res.json({ error: true, message: "Log in failed" })
})



router.get('/google', passport.authenticate("google", {
    scope: ["profile", "email"]
}))



router.get('/google/callback', passport.authenticate("google", {
    successRedirect: `${process.env.NODE_CLIENTURL}`
}))



router.get("/logout", (req, res) => {
    req.logOut();
    res.clearCookie('connect.sid', {
        path: process.env.NODE_CLIENTURL
    })
    req.session = null
    res.redirect(process.env.NODE_CLIENTURL)
})
module.exports = router;