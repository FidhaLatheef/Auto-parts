var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Get the token from the authorization header
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }

    try {
        // Verify the token and decode the payload
        const decoded = jwt.verify(token.replace('Bearer ', ''), 'myjwtsecretkey');

        // Attach the username to the request object
        req.user = decoded;

        // Call the next middleware or route handler
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};