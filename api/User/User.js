const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
    try {
        let users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Get user by name
router.get('/name/:username', async (req, res) => {
    const username = req.params.username;

    try {
        const user = await User.findOne({name: username});

        if(!user) {
            return res.status(404).json({message: "Invalid User"});
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Get user by id
router.get("/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json({message: "Invalid User"});
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;