import { verifyToken } from "../utils/jwt.js";
import {isBlacklisted} from '../utils/token-blacklist.js';

export default function authenticate(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth || !auth.includes('Bearer ')) {
        return res.status(401).send('No token provided');
    }

    const token = auth.split(' ')[1];

    if (isBlacklisted(token)) {
        return res.status(401).send('Token has been invalidated. Log in again.');
    }

    const verifiedToken = verifyToken(token);

    if (!verifiedToken) {
        return res.status(401).send('Invalid or expired token');
    }

    console.log(`verifiedToken: ${JSON.stringify(verifiedToken)}`);

    req.user = verifiedToken;
    
    next();
}