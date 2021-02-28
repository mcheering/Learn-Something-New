// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");

module.exports = function (app) {

  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("signup", {});
  });

  app.get("/login", function (req, res) {
    if (req.user) {
      res.redirect("/members");
    }
    res.render("login", {});
  });

  app.get("/signup", function (req, res) {
    if (req.user) {
      res.redirect("/members");
    }
    res.render("signup", {});
  });

  app.get("/members", function (req, res) {
    if (!req.user) {
      res.redirect("/login");
    }
    res.render("members", {});
  });
};
