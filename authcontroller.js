/*const express = require('express')
const authController = require('express').Router()
const User = require('./User')
const cors = require('cors')
const mongoose = require("mongoose")
require('dotenv').config();

//const mongourl = mongodb+srv://anvesh:anvesh@cluster0.2kj3zif.mongodb.net/?retryWrites=true&w=majority
//app.use(cors())
// register
authController.post('/register', async (req, res) => {
    try {
        const isExisting = await User.findOne({ email: req.body.email })
        if (isExisting) {
            throw new Error("Already such an account with this email. Try a new one!")
        }

        const newUser = await User.create({ name: req.body.name, email: req.body.email, password: req.body.password })
        const { password, ...others } = newUser._doc

        return res.status(201).json({ user: others });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = authController*/