const SubjectModel = require('../models/SubjectModel');

module.exports = {
  create: async (req, res) => {

    // Defining subject model from data aquired over request body

    let subject = new SubjectModel({
      name : req.body.name,
      curriculum : req.body.curriculum
    });
    
    await subject.save()
      .then(result => {
        res.json({ success: true, result: result });
      })
      .catch(err => {
        res.json({ success: false, result: err });
      });
  },
  update: async (req, res) => {

    let subject = new SubjectModel({
      name : req.body.name,
      curriculum : req.body.curriculum
    });

    await SubjectModel.update({_id: req.body._id}, subject)
      .then(subject => {
        if (!subject) res.json({ success: false, result: "Subject does not exist" });

        res.json(subject);
      })
      .catch(err => {
        res.json({ success: false, result: err });
      });
  },
  retrieve: async (req, res) => {
    await SubjectModel.find()
      .then(result => {
        if (!result) res.json({ success: false, result: "No results found" });

        res.json({ success: true, result: result });
      })
      .catch(err => res.json({success: false, result: err}));
  },
  delete: async (req, res) => {
    await SubjectModel.remove({_id: req.body._id})
      .then(result => {
        if (!result) res.json({ success: false, result: "No subject was found with the ID ${req.body.id}" });
        res.json({ success: true, result: result });
      })
      .catch(err => res.json({ success: false, result: err }));
  }
}