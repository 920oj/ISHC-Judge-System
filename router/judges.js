const models = require("../models")
const router = require("express").Router();

// GET /judge これまでの判定結果を一覧で返す 
router.get("/", async (req, res) => {
  try {
    const Judges = await models.judges.findAll();
    res.json(
      Judges.map(judge => {
        return judge.get({ plain: true });
      })
    )
  }
  catch {
    res.status(500);
    res.json({
      err: "Internal Server Error."
    })
  }
});

// GET /judge/:id 任意のidの判定結果を返す
router.get("/:id", async (req, res) => {
  try {
    const Judge = await models.judges.findAll({
      where: {
        id: req.params.id
      }
    });
    if (Judge[0]) {
      res.json(Judge[0].get({ plain: true }));
    }
    else {
      res.status(404);
      res.json({
        err: "Judge is not found."
      });
    }
  }
  catch {
    res.status(500);
    res.json({
      err: "Internal Server Error."
    })
  }
})

module.exports = router;