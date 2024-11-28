const express = require("express");
const team = express.Router();
const teamController = require("../../Controllers/Team/teamController");
const rateLimiter = require("../../middlewares/rateLimiter");


// team Routes
team.post("/",  rateLimiter,  teamController.addTeam);
team.get("/",  rateLimiter, teamController.getTeams);
team.get("/:id",  rateLimiter, teamController.getSingleTeam);
team.put("/:id",  rateLimiter, teamController.updateTeam);
team.delete("/:id",  rateLimiter, teamController.deleteTeam);

module.exports = team;