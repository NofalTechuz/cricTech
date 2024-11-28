const express = require("express");
const players = express.Router();
const playerController = require("../../Controllers/Players/playersController");
const rateLimiter = require("../../middlewares/rateLimiter");


// players Routes
players.post("/",  rateLimiter,  playerController.createPlayer);
players.get("/",  rateLimiter, playerController.getPlayers);
players.get("/:id",  rateLimiter, playerController.getPlayer);
players.put("/:id",  rateLimiter, playerController.updatePlayer);
players.delete("/:id",  rateLimiter, playerController.deletePlayer);
players.get("/sets/:id",  rateLimiter, playerController.fetchPlayersBySets);

module.exports = players;