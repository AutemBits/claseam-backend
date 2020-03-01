const jwt = require('jsonwebtoken');
const fs = require('fs');
const privatekey = fs.readFileSync('./claseam.key');

module.exports = {
    auth: (req, res, next) => {
        let token = req.header('auth-token');
        if(!token) return res.json({ success: false, result: "Access denied", code: 401});

        try {
            let verified = jwt.verify(token, privatekey);
            req.user = verified;
            if(permission && verified.type != permission) return res.json({ success: false, result: "Access denied", code: 401});
            next();
        } catch (err) {
            res.json({ success: false, result: "Invalid token", code: 400});
        }
    },
    authsu: (req, res, next) => {
        let token = req.header('auth-token');
        if(!token) return res.json({ success: false, result: "Access denied", code: 401});

        try {
            let verified = jwt.verify(token, privatekey);
            req.user = verified;
            if(verified.type != 'Su') return res.json({ success: false, result: "Access denied", code: 401});
            next();
        } catch (err) {
            res.json({ success: false, result: "Invalid token", code: 400});
        }
    }
}