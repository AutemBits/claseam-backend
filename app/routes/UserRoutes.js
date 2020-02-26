module.exports = app => {

    const UserControl = require('../controllers/UserControl');
    
    app.post('/api/user/create', UserControl.create);

    app.post('/api/user/update', UserControl.update);

    app.get('/api/user/retrieve', UserControl.retrieve);

    app.delete('/api/user/delete', UserControl.delete);

};