// const { verifySignUp, authJwt } = require("../controllers/authMiddleware");
const auth = require("../controllers/auth.controller");

module.exports = function(app) {
  var router = require('express').Router();
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.post( "/createAccount", auth.createAccount);
  router.post("/logIn", auth.logIn);
  router.post("/code", auth.passCode);
  router.post("/forgotPassword", auth.forgotPassword);

  app.use('/api/auth', router);
};