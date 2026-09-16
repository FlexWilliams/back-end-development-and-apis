
export function authorizeModification(req, res, next) {
    const user = req.user;
    const {role, id} = user;

    const params = req.params;
    const { userId } = params;

    if (!user || (role === 'child' && userId != id)) {
        return res.status(403).json({ "error": "Access denied" });
    } else {
        next();
    }
}