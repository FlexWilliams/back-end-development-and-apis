
export default function authorizeRole(role) {
    console.log(`authorizeRole called for: ${role}`);

    return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
    console.log(`authorizeRole NOT passed!`);
            res.status(403).send('Access denied');
        } else {
    console.log(`authorizeRole passed!`);
            next();
        }
    };
}