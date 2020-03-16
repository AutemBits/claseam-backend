const webpush = require('web-push');
const verify = require('../../VerifyToken');
const router = require('express').Router();
const UserControl = require('../controllers/UserControl');

webpush.setVapidDetails('mailto:noreply@autembits.com', process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
  
router.put('/subscribe', verify.auth, UserControl.update);

router.post('/sendNotification', verify.authsu, (req, res) => {
    const notificationPayload = {
      notification: {
        title: 'ClaseAM',
        body: req.body.notification
      },
    }

    const group = UserControl.retrieveByGroup;
  
    const promises = []
    group.result.forEach(subscription => {
      promises.push(
        webpush.sendNotification(
          subscription,
          JSON.stringify(notificationPayload)
        )
      )
    });
    Promise.all(promises).then(() => res.sendStatus(200));
});

module.exports = router;
