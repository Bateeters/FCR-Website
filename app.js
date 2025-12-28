const express = require("express");
const app = express();
const path = require("node:path");
const forumRouter = require("./routes/forumRouter")

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

const links = [
    { href: "../", text: "Home" },
    { href: "../about", text: "About" },
    { href: "../forum", text: "Forum"}
]

app.use((req, res, next) => {
    res.locals.links = links;
    next();
});

app.get("/", (req, res) => {
    res.render("index", {links: links});
});

app.get("/about", (req, res) => {
    res.render("about", {links: links})
});

app.use("/forum", forumRouter);

app.get("/{*splat}", (req,res) => {
    res.render("error", {links: links});
});

const PORT = 3000;
app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).send(err.message);
});