var express = require("express");
var router = express.Router();
var fetch = require("node-fetch");

var gh_client_id = process.env.GH_CLIENT_ID;
var gh_secret = process.env.GH_SECRET;

if (!gh_client_id || !gh_secret) {
  throw new Error("NO github env variables defined");
}

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/callback", function (req, res, next) {
  // console.log(req);
  const code = req.url.split("=")[1];
  fetch("https://github.com/login/oauth/access_token", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: gh_client_id,
      client_secret: gh_secret,
      code: code,
    }),
  })
    .then((res) => res.text())
    .then((text) => {
      console.log("result", text);
      res.redirect("/dashboard.html");
    });
});

module.exports = router;
