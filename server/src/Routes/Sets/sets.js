const express = require("express");
const sets = express.Router();
const setsController = require("../../Controllers/Sets/SetsController");
const rateLimiter = require("../../middlewares/rateLimiter");


// sets Routes
sets.post("/",  rateLimiter,  setsController.addSetService);
sets.get("/",  rateLimiter, setsController.getSetsService);
sets.get("/:id",  rateLimiter, setsController.getSingleSetService);
sets.put("/:id",  rateLimiter, setsController.updateSetService);
sets.delete("/:id",  rateLimiter, setsController.deleteSetService);

module.exports = sets;