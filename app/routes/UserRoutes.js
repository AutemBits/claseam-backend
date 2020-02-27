const router = require('express').Router();
const verify = require('../../VerifyToken');
const UserControl = require('../controllers/UserControl');
    
router.post('/create', UserControl.create);

router.post('/update', verify.auth, UserControl.update);

router.get('/retrieve', verify.auth, UserControl.retrieve);

router.delete('/delete', verify.auth, UserControl.delete);

module.exports = router;