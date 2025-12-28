const express = require("express");
const app = express();
const path = require("node:path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

const links = [
    { href: "/", text: "Home" },
    { href: "about", text: "About" },
    { href: "forum", text: "Forum"}
]

const users = ["Rose", "Cake", "Biff", "BRoni"];

app.get("/", (req, res) => {
    res.render("index", {links: links});
});

app.get("/about", (req, res) => {
    res.render("about", {links: links})
});

app.get("/forum", (req, res) => {
    res.render("forum", {links: links});
});

app.get("/newPost", (req, res) => {
    res.render("newPost", {links: links})
});

app.get("/{*splat}", (req,res) => {
    res.render("error", {links: links});
});

const PORT = 3000;
app.listen(PORT, (error) => {
    // This is important!
    // without this, any startup errors will silently fail
    // instead of giving you a helpful error message.
    if (error) {
        throw error;
    }

    console.log(`My first Express app - listening on port ${PORT}`);
});

app.use((req, res, next) => {
    throw new Error("OH NO!");
    // or next(new Error("OH NO!"));
});

// Every thrown error in the application or the previous middleware functions 
// calling `next` with an error as an argument will eventually go to this middleware function
app.use((err, req, res, next) => {
    console.error(err);
    // We can now specify the 'err.statusCode' that exists in our custom error class
    // and if it does not exist it's probably an internal server error
    res.status(err.statusCode || 500).send(err.message);
});