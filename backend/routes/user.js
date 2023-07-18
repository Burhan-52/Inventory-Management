import express from "express";
import User from "../model/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const router = express.Router()

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    let { img } = req.body;

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, error: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if an image was provided
        if (req.file) {
            img = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            };
        }

        // Create a new user
        const newUser = await new User({ name, email, password: hashedPassword, img }).save();

        const token = jwt.sign({ id: newUser._id }, process.env.OPTION_JWT)

        res.cookie('token', token, {
            domain: '.inventorycontrol.netlify.app',
            httpOnly: true,
            maxAge: 86400,
            sameSite: "None",
            secure: true
        });

        res.status(201).json({
            success: true,
            newUser,
            token,
            message: 'Congratulations! Your account has been created successfully.'
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ error: 'Email not found' });
        }

        // matchedpassword the password
        const matchedpassword = await bcrypt.compare(password, existingUser.password)
        if (!matchedpassword) {
            return res.status(400).json({ success: false, error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: existingUser._id }, process.env.OPTION_JWT)

        res.cookie('token', token, {
            domain: '.inventorycontrol.netlify.app',
            httpOnly: true,
            maxAge: 86400,
            sameSite: "None",
            secure: true

        });

        res.status(201).json({
            success: true,
            existingUser,
            token,
            message: `Welcome back ${existingUser.name}`
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/profile', async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.OPTION_JWT);
        const user = await User.findOne({ _id: decoded.id });

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

router.delete('/deleteuser', async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.OPTION_JWT);
        const user = await User.findOneAndDelete({ _id: decoded.id });

        res.status(200).json({
            success: true,
            message: "Your account has been deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

router.post('/logout', (req, res) => {
    // Clear the token cookie
    res.clearCookie('token');
    res.json({ success: true, message: 'Logged out successfully' });
});


export default router