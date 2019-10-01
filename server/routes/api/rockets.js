const express = require("express");
const router = express.Router();
const RocketsCtrl = require("../controller/rockets");

router.get("/", RocketsCtrl.apiGetRockets);

module.exports = router;
