const models = require("../models")
const router = require("express").Router();

router.get("/", async (req, res) => {
  // スコア計算
})

router.get("/:id", async (req, res, next) => {
  try {
    const Judges = await models.judges.findAll({
      where: {
        team_id: req.params.id
      },
      include: [{
        model: models.teams,
        required: true
      }]
    })
    let score = 0;
    Judges.map(judge => {
      score += judge.score;
    })
    if (Judges[0]) {
      res.json({
        team_id: Judges[0].team_id,
        team_name: Judges[0].team.name,
        lab_name: Judges[0].team.lab_name,
        score: score,
      });
    }
    else {
      res.status(404);
      res.json({
        err: "Team is not found."
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