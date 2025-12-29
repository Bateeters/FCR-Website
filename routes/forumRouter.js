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

// POST new post
forumRouter.post("/new", (req, res) => {
    const { title, text, user, board } = req.body;

    const newPost = {
        id: Date.now().toString(),
        board,
        title,
        text,
        user,
        added: new Date().toLocaleDateString('en-US')
    };

    posts.push(newPost);

    // Later: write back to JSON or DB
    res.redirect("/forum");
});

module.exports = forumRouter;
