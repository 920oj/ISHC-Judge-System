const models = require("../models")
const router = require("express").Router();

// GET /judge これまでの判定結果を一覧で返す 
router.get("/", async (req, res) => {
  const Judges = await models.judges.findAll();
  res.json(
    Judges.map(judge => {
      return judge.get({ plain: true });
    })
  )
});

// GET /judge/:id 任意のidの判定結果を返す
router.get("/:id", async (req, res) => {
  const Judge = await models.judges.findAll({
    where: {
      id: req.params.id
    }
  });
  res.json(Judge[0].get({ plain: true }));
})

module.exports = router;