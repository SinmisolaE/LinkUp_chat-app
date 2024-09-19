const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

router.get('/rooms', roomController.rooms);

router.get('/rooms/:roomName/messages', roomController.getMessage);

router.post('/rooms/:roomName/messages', roomController.sendMessage);

module.exports = router;