const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/health', require("./router/health"));

const server = app.listen(3001, () => {
  console.log("Server Started! http://localhost:3001/")
})