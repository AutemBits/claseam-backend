const verify = require('../../VerifyToken');

module.exports = app => {

    const UserControl = require('../controllers/UserControl');
    
    app.post('/api/user/create', UserControl.create);

    app.post('/api/user/update', verify.auth, UserControl.update);

    app.get('/api/user/retrieve', verify.auth, UserControl.retrieve);

    app.delete('/api/user/delete', verify.auth, UserControl.delete);

};