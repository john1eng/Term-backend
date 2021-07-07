const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const termController = require("../controllers/terms-controller");

router.get("/", termController.getAllTerms);

//get term
router.get("/:word", termController.getTermByWord);
//get text
router.get("/text/:text", termController.getTermByText);

//post term
router.post(
  "/",
  [check("term").not().isEmpty(), check("definition").not().isEmpty()],
  termController.createTerm
);

//update term
router.patch("/:word", termController.updateTerm);

//delete term
router.delete("/:word", termController.deleteTerm);

module.exports = router;
