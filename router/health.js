const router = require("express").Router();

router.get('/', (req, res) => {
  res.status(200);
  res.send("OK");
  res.end();
})

module.exports = router;