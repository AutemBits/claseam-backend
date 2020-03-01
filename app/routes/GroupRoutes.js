const router = require('express').Router();
const verify = require('../../VerifyToken');
const GroupControl = require('../controllers/GroupControl');

router.post('/create', verify.authsu, GroupControl.create);

router.post('/update', verify.authsu, GroupControl.update);

router.get('/retrieve', verify.authsu, GroupControl.retrieve);

router.delete('/delete', verify.authsu, GroupControl.delete);

module.exports = router;