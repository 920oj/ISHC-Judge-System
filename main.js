const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("models", require("./models"))

app.use('/health', require("./router/health"));
app.use('/judge', require("./router/judges"));

const server = app.listen(3001, () => {
  console.log("Server Started! http://localhost:3001/")
})