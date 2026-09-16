import { verifyToken } from "../utils/jwt.js";

export function authenticate(req, res, next) {
    const auth = req.headers.authorization;

    if (!auth || !auth.includes('Bearer ')) {
        return res.status(401).json({ "error": "No token provided." });
    }

    const token = auth.split(' ')[1];

    const verifiedToken = verifyToken(token);

    if (!verifiedToken) {
        return res.status(401).json({ "error": "Invalid or expired token." });
    }

    console.log(`verifiedToken: ${JSON.stringify(verifiedToken)}`);

    req.user = verifiedToken;
    
    next();
}