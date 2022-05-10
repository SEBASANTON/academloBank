const express = require('express');
const { body } = require('express-validator');

const {
transferPeticion
}= require('../controllers/transfers.controller')

const router = express.Router();
router.route('/').post(transferPeticion);

module.exports = { transfersRouter: router };
