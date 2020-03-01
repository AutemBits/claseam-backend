const router = require('express').Router();
const verify = require('../../VerifyToken');
const ActivityControl = require('../controllers/ActivityControl');

router.post('/create', verify.authsu, ActivityControl.create);

router.post('/update', verify.authsu, ActivityControl.update);

router.get('/retrieve', verify.authsu, ActivityControl.retrieve);

router.delete('/delete', verify.authsu, ActivityControl.delete);

module.exports = router;