const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const AdminsData = require('../models/adminuser'); // Import the AdminsData model


const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const adminuser = require('../models/adminuser');
const jwtSecret = "jdfkajsdklfjalkdjf&fakfjasdjf"
router.post("/createuser", [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), message: "Enter valid credentialsss" });
        }

        // Check if user with the provided email already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create new user
        await user.create({
            name: req.body.name,
            password: hashedPassword,
            email: req.body.email,
            location: req.body.location
        });

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

router.post("/loginuser", [
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        const userData = await User.findOne({ email });
        console.log(userData.name)

        // Check if userData is null (user not found)
        if (!userData) {
            return res.status(400).json({ errors: "Invalid email or password"});
        }

        // Compare passwords
        const pwdCompare = await bcrypt.compare(password, userData.password);

        // If passwords don't match, return error
        if (!pwdCompare) {
            return res.status(400).json({ errors: "Invalid email or password" });
        }

        // Passwords match, create JWT token
        const data = {
            user: {
                id: userData.id
            }
        }

        const authToken = jwt.sign(data, jwtSecret);

        // Return success response with auth token
        res.json({ success: true, authToken: authToken,name:userData.name});
        console.log(userData.name)

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

router.post("/adminlogin", [
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { adminid, email, password } = req.body;
        // Find the user based on both email and adminid
        const userData = await AdminsData.findOne({ email, adminid });


        // Check if userData is null (user not found)
        if (!userData) {
            return res.status(400).json({ errors: "Invalid email or password" });
        }

        // Compare passwords

        // If passwords don't match, return error
        if (password!==userData.password) {
            return res.status(400).json({ errors: "Invalid email or password" });
        }

        // Passwords match, create JWT token
        const data = {
            user: {
                id: userData.id
            }
        }

        const authToken = jwt.sign(data, jwtSecret);

        // Return success response with auth token
        res.json({ success: true, authToken: authToken,adminid:true });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});


module.exports = router;