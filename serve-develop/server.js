const axios = require("axios");
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
const dev1Router = express.Router();
const dev2Router = express.Router();

const dev1ServerUrl = "http://localhost:3000";
const dev2ServerUrl = "http://localhost:3001";

dev1Router.use(
  "*",
  createProxyMiddleware({
    target: dev1ServerUrl,
    ws: true,
  })
);

dev2Router.use(
  "*",
  createProxyMiddleware({
    target: dev2ServerUrl,
    ws: true,
    // pathRewrite: {
    //   "^/dev-app2": "/dev-app",
    // },
  })
);

app.use("/dev-app", dev1Router);
app.use("/dev-app2", dev2Router);

app.get("/", (req, res) => {
  res.send(
    `<!DOCTYPE html><html lang="en"><ul><li><a href="/dev-app">see dev-app1</a></li><li><a href="/dev-app2">see dev-app2</a></li><li><a href="/dev-app2/test-router/test">see dev-app2's route-page</a></li></ul></html>`
  );
});

const port = 8000;
app.listen(port, (e) => {
  if (!e) {
    console.log(`start serve at ${port}`);

    try {
      const open = require("open");
      open(`http://localhost:${port}`, {
        app: "Google Chrome",
        wait: false,
        url: true,
      }).catch(() => {});
    } catch (openBrowserErr) {
      console.log(openBrowserErr);
    }
  }
});
