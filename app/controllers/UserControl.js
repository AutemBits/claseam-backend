const UserModel = require('../models/UserModel');
const Validate = require('../../DataValidation');
const bcrypt = require('bcryptjs');

module.exports = {
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
      password : hashPassword,
      type : req.body.type,
      group : req.body.group,
      grades : req.body.grades,
      activities : req.body.activities
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
      type : req.body.type,
      group : req.body.group,
      grades : req.body.grades,
      activities : req.body.activities
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
        if (!result) res.json({ success: false, result: "No user was found with the ID ${req.body.id}" });
        res.json({ success: true, result: result });
      })
      .catch(err => res.json({ success: false, result: err }));
  },
  gradeActivity: async (req, res) => {
    await UserModel.findOneAndUpdate(req.body.alumn, { $push : { grades : [req.body.activity, req.body.grade] } })
    .then(result => {
      if (!result) res.json({ success : false, result: "Alumn does not exist"});
      res.json(result);
    })
    .catch(err => {
      res.json({ success : false, result: err });
    });
  },
  uploadActivity: async (req, res) => {
    await UserModel.findOneAndUpdate(req.body._id, { $push : { activities : req.body.activity } })
    .then(result => {
      if (!result) res.json({ success : false, result: "Alumn does not exist"});
      res.json(result);
    })
    .catch(err => {
      res.json({ success : false, result: err });
    });
  }
}