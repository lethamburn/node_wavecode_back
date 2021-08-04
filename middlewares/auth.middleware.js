const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.send(403);
    }
};

const isAdmin = (req, res, next) => {
    if (req.user.role === 'admin') {
        return next();
    } else {
        return res.send(403);
    }
}

module.exports = {
    isAuthenticated,
    isAdmin,
}