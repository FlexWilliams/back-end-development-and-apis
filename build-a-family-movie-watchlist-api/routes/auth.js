import express from "express";
import bcrypt from "bcryptjs";
import { signToken } from "../utils/jwt.js";
import {findByUsername} from '../utils/db.js';

const router = express.Router();

router.post('/login', async (req, res, next) => {
    console.log(`/login called`);

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    const user = findByUsername(username);
    if (!user) {
        return res.status(401).send('Invalid credentials');
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
        return res.status(401).send('Invalid credentials');
    }

    const token = signToken(user);

    res.status(200).json({ message: 'Successfully logged in!', token })
});


export default router;

