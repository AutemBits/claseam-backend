const router = require('express').Router();
const verify = require('../../VerifyToken');
const GroupControl = require('../controllers/GroupControl');

router.post('/create', verify.authsu, GroupControl.create);

router.put('/update', verify.authsu, GroupControl.update);

router.put('/addUser', verify.authsu, GroupControl.addUser);

router.put('/assignActivity', verify.authsu, GroupControl.assignActivity);

router.get('/retrieve', verify.authsu, GroupControl.retrieve);

router.get('/retrieveOne', verify.authsu, GroupControl.retrieveOne);

router.delete('/delete', verify.authsu, GroupControl.delete);

module.exports = router;