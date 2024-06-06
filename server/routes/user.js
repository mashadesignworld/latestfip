import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js'; // Ensure .js extension is included
import nodemailer from 'nodemailer'
import cors from 'cors'; // Add CORS import
import dotenv from 'dotenv'

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        return res.json({ status: true, message: "User Registered" });
    } catch (error) {
        res.status(500).send('Error signing up user: ' + error.message);
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "User is not yet registered" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.json({ message: "Invalid Password" });
        }

        const token = jwt.sign({ username: user.username }, process.env.KEY, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
        return res.json({ status: true, message: "Login Successful" });
    } catch (error) {
        res.status(500).send('Error logging in user: ' + error.message);
    }
});

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({ message: "user not registered" })
        }

        const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: '1d' })

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'njugunak.kevin@gmail.com',
                pass: 'oxxj hawr ajel wwlb'
            }
        });

        var mailOptions = {
            from: 'njugunak.kevin@gmail.com',
            to: 'daguri1985@gmail.com',
            subject: 'Reset Passwod',
            text: `http://localhost:5173/resetPassword/${token}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return res.strictContentLength({ message: "error sending" })
            } else {
                return res.strictContentLength({ status: true, message: "email sent" })
            }
        });

    } catch (err) {
        return res.json("invalid token")
    }
})


router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body
    try {
        const decoded = jwt.verify(token, process.env.KEY);
        const id = decoded.id;
        const hashPassword = await bcrypt.hash(password, 30)
        await User.findByIdAndUpdate(id, { password: hashedPassword })
    } catch (err) {
        return res.json("invalid token")
    }

})



export { router as UserRouter };
