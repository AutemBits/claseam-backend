const Models = require('../models/GroupModel');
const GroupModel = Models.GroupModel;
const PeriodModel = Models.PeriodModel;

module.exports = {
  create: async (req, res) => {

    // Defining group model from data aquired over request body

    let period = new PeriodModel({
      monday : req.body.monday,
      tuesday : req.body.tuesday,
      wednesday : req.body.wednesday,
      thursday : req.body.thursday,
      friday : req.body.friday
    });

    let group = new GroupModel({
        group : req.body.group,
        calendar : req.body.calendar,
        subject : req.body.subject,
        alumni : req.body.alumni,
        activities : req.body.activities,
        periods : period,
        status : req.body.status
    });
    
    await group.save()
      .then(result => {
        res.json({ success: true, result: result });
      })
      .catch(err => {
        res.json({ success: false, result: err });
      });
  },
  update: async (req, res) => {

    let period = new PeriodModel({
      monday : req.body.monday,
      tuesday : req.body.tuesday,
      wednesday : req.body.wednesday,
      thursday : req.body.thursday,
      friday : req.body.friday
    });

    let group = new GroupModel({
        group : req.body.group,
        calendar : req.body.calendar,
        subject : req.body.subject,
        alumni : req.body.alumni,
        activities : req.body.activities,
        periods : period,
        status : req.body.status
    });

    await GroupModel.update({_id: req.body._id}, group)
      .then(group => {
        if (!group) res.json({ success: false, result: "Group does not exist" });

        res.json(group);
      })
      .catch(err => {
        res.json({ success: false, result: err });
      });
  },
  retrieve: async (req, res) => {
    await GroupModel.find()
      .then(result => {
        if (!result) res.json({ success: false, result: "No results found" });

        res.json({ success: true, result: result });
      })
      .catch(err => res.json({success: false, result: err}));
  },
  retrieveOne: async (req, res) => {
    await GroupModel.findById(req.body._id)
      .then(result => {
        if (!result) res.json({ success: false, result: "No results found" });
        res.json({ success: true, result: result });
      })
      .catch(err => res.json({ success: false, result: err}));
  },
  delete: async (req, res) => {
    await GroupModel.remove({_id: req.body._id})
      .then(result => {
        if (!result) res.json({ success: false, result: "No group was found with the ID ${req.body.id}" });
        res.json({ success: true, result: result });
      })
      .catch(err => res.json({ success: false, result: err }));
  },
  assignActivity: async (req, res) => {
    await GroupModel.findByIdAndUpdate(req.body._id, { $push : { activities : req.body.activity } })
      .then(result => {
        if (!result) res.json({ success : false, result: "Group does not exist"});
        res.json(result);
      })
      .catch(err => {
        res.json({ success : false, result: err });
      });
  },
  addUser: async (req, res) => {
    await GroupModel.findByIdAndUpdate(req.body.group, { $push : { Alumni : req.body._id } })
      .then(result => {
        if (!result) res.json({ success : false, result: "Group does not exist"});
        res.json(result);
      })
      .catch(err => {
        res.json({ success : false, result: err });
      });
  }
}