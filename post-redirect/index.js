const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app1 = express();
const app2 = express();
const app3 = express();

app1.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

// app2.use(
//   bodyParser.urlencoded({
//     extended: true,
//     type: "application/x-www-form-urlencoded",
//   })
// );

app2.use("*", (req, res) => {
  console.log("app2 receive request", req.body);
  res.redirect(307, "http://localhost:3003");
});

app3.use(
  bodyParser.urlencoded({
    extended: true,
    type: "application/x-www-form-urlencoded",
  })
);

app3.use("*", (req, res) => {
  console.log("app3 receive request", req.body);
  res.send("reach app3");
});

app1.listen(3001, () => console.log("listen on 3001"));
app2.listen(3002, () => console.log("listen on 3002"));
app3.listen(3003, () => console.log("listen on 3003"));
