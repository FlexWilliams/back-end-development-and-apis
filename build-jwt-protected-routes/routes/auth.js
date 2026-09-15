import express from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { findByEmail, readUsers, writeUsers } from '../utils/db.js';
import { signToken } from "../utils/jwt.js";
import authenticate from "../middleware/authenticate.js";
import {blacklistToken} from '../utils/token-blacklist.js';

const router = express.Router();

router.get('/profile', authenticate, (req, res) => {
    console.log(`/profile called`);
    res.status(200).json({ user: req.user });
});

router.post('/logout', authenticate, (req, res) => {
    console.log(`/logout called`);

     const token = req.headers.authorization.split(' ')[1];
    blacklistToken(token);

    res.status(200).json({ message: "Logged out successfully" });
});

router.post('/register', async (req, res, next) => {
    console.log(`/register called`);

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    if (findByEmail(email)) {
        return res.status(409).send('Email already in use');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const users = readUsers();

    const user = {
        id: crypto.randomUUID(),
        email,
        passwordHash,
        role: 'user'
    };

    users.push(user);

    writeUsers(users);

    const token = signToken(user);

    res.status(201).json({ message: 'Successfully registered!', token })

});


router.post('/login', async (req, res, next) => {
    console.log(`/login called`);

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    const user = findByEmail(email);
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

