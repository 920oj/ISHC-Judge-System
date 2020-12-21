const models = require("../models")
const router = require("express").Router();
const fs = require("fs");
const os = require("os");
const { execSync } = require("child_process");


// POST /submit
// Request Body:
// - team_id: チームID
// - answer: 解答
// - language: 言語

// Response
// WAの場合
// {err: "Wrong Answer!"}
// ACの場合
// {msg: "All Correct!", memory: "100kb", time: "300ms"}


router.post("/:id", async (req, res) => {
  try {
    const values = {
      //judge_idはauto increment
      team_id: req.body.team_id,
      question_id: req.params.id,
      answer: req.body.answer,
      correct_flg: 0,
      score: 0,
      memory: 0,
      answer_time: 0,
      language: req.body.language,
      msg: "Wrong Answer!",
      created_at: Date.now(),
      updated_at: Date.now()

      //created_at, Updated_atはTimestamp
    }

    //仮データをSQL登録
    const init_judge = await models.judges.create(values)
    console.log(`仮登録judgeのid: ${init_judge.id}`); // これで仮judge_idとれないかな？

    //answerファイルにする
    let ext = "";
    switch (values.language) {
      case "c":
        ext = ".c";
        break;
      case "cpp":
        ext = ".cpp";
        break;
      case "python":
        ext = ".py";
        break;
      case "php":
        ext = ".php";
        break;
      case "js":
        ext = ".js";
        break;
      case "ruby":
        ext = ".rb";
        break;
      case "sh":
        ext = ".sh"
        break;
    }

    let answer_file_path = `/tmp/${values.team_id}_${values.question_id}_${values.language}_` + Date.now() + ext;
    const codes = values.answer.split("\r\n")
    let tmp = ""
    codes.forEach(elem => {
      tmp += elem + os.EOL
    })
    // ファイルとしてコードの内容を書き出す
    try {
      fs.writeFileSync(answer_file_path, tmp, "utf8")
      console.log("ファイル書き込み成功")
    } catch (e) {
      console.log("ファイル書き込み失敗！")
      console.log(e)
    }

    let testcase = `/backend/problems/${values.question_id}/test`;
    let command = `bash ojexec.sh ${values.language} ${answer_file_path} ${testcase}`;

    //ojコマンド標準出力受け取り
    let result = execSync(command, { timeout: 20000 });
    result = Buffer.from(result).toString('utf-8')
    //result=1ならWA, 0ならAC
    if (result == "1") {
      values.correct_flg = 0;
      values.score = 0;
      values.msg = "Wrong Answer!";
    } else {
      let result_data = result.split("\n");

      values.correct_flg = 1;
      values.memory = result_data[1];
      values.answer_time = result_data[0];
      values.msg = "All Correct!"

      values.score = 100;
      //ここは問題番号で分岐
    }

    //SQL登録
    await models.judges.update(values, {
      where: {
        id: init_judge.id
      }
    });

    if (values.msg == "All Correct!") {
      res.json({
        msg: values.msg,
        memory: values.memory + " MB",
        time: values.answer_time + " sec"
      });
    } else {
      res.json({ err: values.msg })
    }
  } catch {
    res.status(500);
    res.json({
      err: "Internal Server Error."
    })
  }
})

module.exports = router;