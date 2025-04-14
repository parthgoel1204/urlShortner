const express = require('express');
const {handleCreateUser,handleUserLogin} = require('../Controllers/user');
const router = express.Router();

router.post('/', handleCreateUser);
router.post('/login', handleUserLogin);

module.exports = router;