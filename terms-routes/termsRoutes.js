const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

const termController = require('../controllers/terms-controller');

// router.get("/", (req, res) => { res.send('Hello World!') })

//get term
router.get('/:word', termController.getTermByWord)
//post term
router.post('/', [check('term').not().isEmpty(), check('definition').not().isEmpty()], termController.createTerm)

//update term
router.patch('/:word', [check('term').not().isEmpty(), check('definition').not().isEmpty()], termController.updateTerm)

//delete term
router.delete('/:word', termController.deleteTerm)

module.exports = router;