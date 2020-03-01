const router = require('express').Router();
const verify = require('../../VerifyToken');
const SubjectControl = require('../controllers/SubjectControl');

router.post('/create', verify.authsu, SubjectControl.create);

router.post('/update', verify.authsu, SubjectControl.update);

router.get('/retrieve', verify.authsu, SubjectControl.retrieve);

router.delete('/delete', verify.authsu, SubjectControl.delete);

module.exports = router;