import express from "express";
import authenticate from "../middleware/authenticate.js";
import authorizeRole from "../middleware/authorize.js";
import { readUsers } from '../utils/db.js';

const router = express.Router();

router.get('/users', authenticate, authorizeRole("admin"), (req, res) => {
    console.log(`/users called`);

    const users = readUsers().map(user => {
        delete user.passwordHash;

        return user;
    });

    res.status(200).json({users});
});


export default router;