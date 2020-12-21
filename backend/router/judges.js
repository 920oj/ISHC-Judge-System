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

router.get("/teams/:id", async (req, res) => {
  try {
    const teams = await models.judges.findAll({
      where: {
        team_id: req.params.id
      }
    });
    if (teams[0]) {
      res.json(
        teams.map(judge => {
          return judge.get({ plain: true });
        })
      )
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

router.get("/teams/:id/correct", async (req, res) => {
  try {
    const Judge = await models.judges.findAll({
      where: {
        team_id: req.params.id
      }
    });
    if (Judge[0]) {
      const judge_list = Judge.map(judge => {
        return judge.get({ plain: true });
      })
      const correct_list = judge_list.filter(judge => {
        return (judge.correct_flg === 1)
      })

      let correct_arr = [];
      correct_list.forEach(item => {
        correct_arr.push(item.question_id);
      });
      correct_arr = correct_arr.filter((x, i, self) => self.indexOf(x) === i);
      correct_arr = correct_arr.sort((a, b) => a - b)
      res.json(correct_arr);
    }
    else {
      res.status(200);
      res.json([]);
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