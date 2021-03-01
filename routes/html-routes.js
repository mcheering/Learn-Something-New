// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");

module.exports = (app) => {

  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("signup", {});
  });

  app.get("/login", (req, res) => {
    if (req.user) {
      res.redirect("/members");
    }
    res.render("login", {});
  });

  app.get("/signup", (req, res) => {
    if (req.user) {
      res.redirect("/members");
    }
    res.render("signup", {});
  });

  app.get("/members", isAuthenticated, (req, res) => {
    if (!req.user) {
      res.redirect("/login");
    }
    res.render("members", {});
  });
};
