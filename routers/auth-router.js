const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
const validate = require("../middleware/validator-middleware");
const signupSchema = require("../validator/validator");

router.route("/home").get(authController.home);
router.route("/register").post(validate(signupSchema), authController.register);
router.route("/login").post(authController.login);

module.exports = router;
