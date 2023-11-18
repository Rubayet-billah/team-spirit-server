const express = require("express");
const { UserRouter } = require("../modules/users/user.routes");

const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
