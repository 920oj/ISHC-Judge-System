const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("models", require("./models"))

app.use('/health', require("./router/health"));
app.use('/judge', require("./router/judges"));
app.use('/score', require("./router/score"));
app.use('/submit', require("./router/submit"));

const server = app.listen(3001, () => {
  console.log("Server Started! http://localhost:3001/")
})

// メモ
// 1. (be)チームの正解している問題リストを返すエンドポイント Done.
// 2. (fe)解答するページ→問題リスト・回答状況ページと、解答ページ
// 3. (be)submit
// 3. (all)Dockerfile
// 4. 