const models = require("../models")
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const Teams = await models.teams.findAll({
      include: [{
        model: models.judges,
        required: false
      }],
      order: [
        ['id', 'ASC']
      ],
    });

    let result = [];

    Teams.forEach(team => {
      let score = 0;
      team.judges.forEach(judge => {
        score += judge.score;
      })
      result.push({
        team_id: team.id,
        team_name: team.name,
        lab_name: team.lab_name,
        score: score,
      })
    })

    res.json(result);
  }
  catch {
    res.status(500);
    res.json({
      err: "Internal Server Error."
    })
  }
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