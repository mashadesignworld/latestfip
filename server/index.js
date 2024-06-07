import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { UserRouter } from './routes/user.js';

dotenv.config();

// Resolving __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173", "https://fipsignup-client.vercel.app"],
    credentials: true
}));
app.use(cookieParser());
app.use('/auth', UserRouter);

// Use the client App
const clientDistPath = path.join(__dirname, 'client/dist');
app.use(express.static(clientDistPath, {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

// Render client for any path
app.get('*', (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'), (err) => {
        if (err) {
            console.error('Error sending index.html:', err);
            res.status(500).send(err);
        }
    });
});

// Connect to MongoDB Database
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.error("Database connection error:", err));


app.listen(process.env.PORT, () => {
    console.log("Server is Running")
});
