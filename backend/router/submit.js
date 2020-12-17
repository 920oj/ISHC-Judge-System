const models = require("../models")
const router = require("express").Router();
const execSync = require("child_process")

const commands = {
  "python": `oj t -c "python3 {file}"`,
  "node": `oj t -c "node {file}"`,
  "c": `gcc {file} && oj t`,
}

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

//残りのTodo
// SQLにnullな状態で登録する(埋められるものを埋めて)→一度入れたanswer_idをupdateする
// answerのファイル置く場所を決める( let global_path )
// exexojのresultを正規表現を使って各種データを取得する(time,memory)
// scoreのルールを元にscoreを計算、登録する

router.post("/:id", async (req, res) => {
  try {
    const question_id = req.params.id;
    const team_id = req.body.team_id;
    const answer = req.body.answer;
    const language = req.body.language;
    let msg;
    let correct_flg;
    let answer_time;
    let memory;
    let score;

    //判定処理
    //answerファイルにする
    let answer_file_path = `${global_path}/tmp/${team_id}_${question_id}_${language} ` + Date.now();
    const codes = code.split("\n")

    let tmp = ""
    codes.forEach(elem => {
      tmp += elem + os.EOL
    })
    // ファイルとしてコードの内容を書き出す
    try {
      fs.writeFileSync(answer_file_path, tmp, "utf8")
    } catch (e) {
      console.log(e)
    }


    let global_path = ''; //環境変数 

    let testcase = `${global_path}/backend/problems/${question_id}/test`;
    let command = `ojexec.sh ${language} ${answer_file_path} ${testcase}`;

    //ojコマンド標準出力受け取り

    const result = execSync(command);


    if (!result) {
      msg = "Wrong Answer!";
      correct_flg = 0;
      score = 0;
    } else {
      msg = "All Correct!"
      correct_flg = 1;
      let answer_time;
      let memory;
      let score;
    }




    //SQL登録
    const values = {
      team_id: team_id,
      question_id: question_id,
      answer: answer,
      correct_flg: correct_flg,
      score: score,
      language: language,
      memory: memory,
      answer_time: answer_time,
      msg: msg
    }

    const judge = await Judges.create(values);

    if (msg == "All Correct!") {
      res.json({ msg: msg, memory: memory, time: answer_time })
    } else {
      res.json({ err: msg })
    }
  } catch {
    res.status(500);
    res.json({
      err: "Internal Server Error."
    })
  }
})

module.exports = router;