const express = require('express');
const router = express.Router();
const controller = require('../Controllers/loanController');

router.get('/loans', controller.getLoans);
router.post('/loans', controller.addLoan);
router.post('/loans/:id/payments', controller.addPago);
router.patch('/loans/:id/terminar', controller.markAsTerminado);
router.delete('/loans/:id', controller.deleteLoan);

module.exports = router;
