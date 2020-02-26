const Validate = require('../../DataValidation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');

module.exports = app => {

    app.post(
        '/api/login', async (req, res) => {

            let privatekey = fs.readFileSync('../../claseam.pem');

            // Verify if the email is not already in use by someone else

            let user = await UserModel.findOne({ correo : req.body.email });
            if (!user) return res.json({ success: false, result: "Could not find email"});

            // Verify if password is correct

            let validPass = await bcrypt.compare(req.body.password, user.password);
            if (!validPass) return res.json({ success: false, result: "Invalid password"});

            let token = jwt.sign({
                _id : user._id,
                email : user.email,
                type : user.type
            }, privatekey, { expiresIn : '1h'});

            res.header('auth-token', token).send(token);
            res.json({ success : true, result: "Logged in successfully"});

        }
    )

};