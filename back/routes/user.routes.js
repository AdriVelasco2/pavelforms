const { authJwt } = require("../middlewares");

module.exports = app => {
    const user = require("../controllers/user.controller");
    var router = require("express").Router();

    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], user.createUser);
    router.get("/", [authJwt.verifyToken, authJwt.isAdmin], user.getUsers);
    router.get("/:id", [authJwt.verifyToken, authJwt.isAdmin], user.getUser);
    router.put('/password/:id', user.updatePass);
    
    app.use('/api/user', router);
};