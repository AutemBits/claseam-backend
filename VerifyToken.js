const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = {
    auth = (req, res, next) => {
        let token = req.header('auth-token');
        if(!token) return res.json({ success: false, result: "Access denied", code: 401});

        try {
            let privatekey = fs.readFileSync('../../claseam.pem');
            let verify = jwt.verify(token, privatekey);
            req.user = verified;
            next();
        } catch (err) {
            res.json({ success: false, result: "Invalid token", code: 400});
        }
    }
}