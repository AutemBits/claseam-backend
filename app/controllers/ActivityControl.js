const ActivityModel = require('../models/ActivityModel');

module.exports = {
  create: async (req, res) => {

    // Defining activity model from data aquired over request body

    let activity = new ActivityModel({
        title : req.body.title,
        details : req.body.details,
        subject : req.body.subject
    });
    
    await activity.save()
      .then(result => {
        res.json({ success: true, result: result });
      })
      .catch(err => {
        res.json({ success: false, result: err });
      });
  },
  update: async (req, res) => {

    let activity = new ActivityModel({
        title : req.body.title,
        details : req.body.details,
        subject : req.body.subject
    });

    await ActivityModel.update({_id: req.body._id}, activity)
      .then(activity => {
        if (!activity) res.json({ success: false, result: "Activity does not exist" });

        res.json(activity);
      })
      .catch(err => {
        res.json({ success: false, result: err });
      });
  },
  /*
  *     TODO:
  *         Retrieve for specific subject
  *         Retrieve for specific group
  */
  retrieve: async (req, res) => {
    await ActivityModel.find()
      .then(result => {
        if (!result) res.json({ success: false, result: "No results found" });

        res.json({ success: true, result: result });
      })
      .catch(err => res.json({success: false, result: err}));
  },
  delete: async (req, res) => {
    await ActivityModel.remove({_id: req.body._id})
      .then(result => {
        if (!result) res.json({ success: false, result: "No activity was found with the ID ${req.body.id}" });
        res.json({ success: true, result: result });
      })
      .catch(err => res.json({ success: false, result: err }));
  }
}