const UserModel = require('../models/UserModel');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const privatekey = fs.readFileSync('./claseam.key');

/*
*   Authentication route
*       This route is responsible of assigning json
*       web tokens after every successful logins
*/

router.post(
    '/login', async (req, res) => {

        // Verify if the email matches with any registered user's

        let user = await UserModel.findOne({ email : req.body.email });
        if (!user) return res.json({ success: false, result: "Could not find email"});

        // Verify if the entered password is correct

        let validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) return res.json({ success: false, result: "Invalid password"});

        // Assign json web token to the response header

        let token = jwt.sign({
            _id : user._id,
            email : user.email,
            type : user.type
        }, privatekey, { expiresIn : '1h'});

        res.header('auth-token', token).send({ success : true, result: "Logged in successfully", token: token});

    }
);

module.exports = router;