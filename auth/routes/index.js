const express = require('express');
const router = express.Router();
const authUtility = require("../middleware/Auth");
const validator = require("../middleware/validator");
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'AuthEND Point' });
});

router.post("/auth", validator.validateAuth, (req, res) => {

  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  const token = authUtility.genrateJWT(username, password);
  res.status(200).json({
    token,
    username
  });
});

router.all("*", (req, res) => {
  res.status(404).json({ message: "Invalid Route" })
});
module.exports = router;
