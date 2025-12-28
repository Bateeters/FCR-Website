const { Router } = require("express");

const forumRouter = Router()

const boards = [
    {
        title: "Announcements"
    },
    {
        title: "Patch Notes"
    },
    {
        title: "Discussion"
    },
    {
        title: "Feedback"
    },
    {
        title: "Bug Reports"
    },

]

const posts = [
    {
        title: "Hi there!",
        text: "This is the first post to the forum board!",
        user: "Brian",
        added: new Date()
    },
    {
        title: "Welcome to the FCR community!",
        text: "Food Chain Rumble is a dream project of mine. A passion project to bring a 3D platform brawler game concept to life.",
        user: "SweetTeets13",
        added: new Date()
    },
]

forumRouter.get("/", (req, res) => {
    res.render("forum/forum", {
        posts: posts,
        boards: boards
    });
});

forumRouter.get("/newPost", (req,res) => {
    res.render("forum/newPost")
});

module.exports = forumRouter;