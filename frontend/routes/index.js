var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Accelerometer" });
});

router.get("/simplified", (req, res, next) => {
  res.render("simplified", { title: "Simplified" });
});

module.exports = router;
