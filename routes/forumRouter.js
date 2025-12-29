const { Router } = require("express");
const forumRouter = Router();

// Import JSON using require
const jsonData = require("../data/data.json");

const posts = jsonData.posts;
const boards = jsonData.boards;

forumRouter.get("/", (req, res) => {
    res.render("forum/forum", {
        posts,
        boards
    });
});

forumRouter.get("/newPost", (req, res) => {
    res.render("forum/newPost");
});

module.exports = forumRouter;
