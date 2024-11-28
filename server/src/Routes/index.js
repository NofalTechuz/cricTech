const express = require("express");

const router = express.Router();


const sets = require("./Sets/sets");
const Players = require("./Players/players");
const Teams = require("./Teams/teams");




router.use("/sets", sets);
router.use("/players", Players);
router.use("/teams", Teams);


module.exports = router;
