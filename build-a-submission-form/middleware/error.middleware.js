
function notFoundHandler(req, res, next) {
    const error = new Error(`Resource doest not exist for: ${req.originalUrl}`);
    error.status = 404;

    next(error);
}

function finalErrorHandler(err, req, res, next) {
    const status = err.status || 500;
    const message = status === 500 ? 'Internal Server Error (Check Server Logs)' : err.message;
    
    console.error(err.message);

    res.status(status).json({ error: true, status, message });
}

export {
    notFoundHandler,
    finalErrorHandler
};