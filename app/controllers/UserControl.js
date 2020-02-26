const UserModel = require('../models/UserModel');
const Validate = require('../../DataValidation');
const bcrypt = require('bcryptjs');

module.exports = {
  // Function to create new users
  create: async (req, res) => {

    // Data validation using previosly defined schemas from the DataValidation import

    let { error } = Validate.user(req.body);
    if (error) return res.json({ success: false, result: error.details[0].message});

    // Verify if the email is not already in use by someone else

    let emailExists = await UserModel.findOne({ correo : req.body.email });
    if (emailExists) return res.json({ success: false, result: "User already exists"});

    // Password encryption using bcrypt

    let salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(req.body.password, salt);

    // Defining user model from data aquired over request body

    let user = new UserModel({
      forename : req.body.forename,
      surname : req.body.surname,
      email : req.body.email,
      password: hashPassword,
      group : req.body.group,
      grades : req.body.grades
    });
    
    await user.save()
      .then(result => {
        res.json({ success: true, result: result });
      })
      .catch(err => {
        res.json({ success: false, result: err });
      });
  },
  update: async (req, res) => {

    // Data validation using previosly defined schemas from the DataValidation import

    let { error } = Validate.user(req.body);
    if (error) return res.json({ success: false, result: error.details[0].message});
  
    // Password encryption using bcrypt

    let salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(req.body.password, salt);
    
    // Defining user model from data aquired over request body

    let user = new UserModel({
      forename : req.body.forename,
      surname : req.body.surname,
      email : req.body.email,
      password: hashPassword,
      group : req.body.group,
      grades : req.body.grades
    });

    await UserModel.update({_id: req.body._id}, user)
      .then(user => {
        if (!user) res.json({ success: false, result: "User does not exist" });

        res.json(user);
      })
      .catch(err => {
        res.json({ success: false, result: err });
      });
  },
  retrieve: async (req, res) => {
    await UserModel.find()
      .then(result => {
        if (!result) res.json({ success: false, result: "No results found" });

        res.json({ success: true, result: result });
      })
      .catch(err => res.json({success: false, result: err}));
  },
  delete: async (req, res) => {
    await UserModel.remove({_id: req.body._id})
      .then(result => {
        if (!result) res.json({ success: false, result: "No user was found with the ID" });
        res.json({ success: true, result: result });
      })
      .catch(err => res.json({ success: false, result: err }));
  }
}