const express = require('express');
const urlRoute = require('./Routes/url');
const cookiesParser = require('cookie-parser');
const {checkForAuthentication, restrictTo} = require('./middlewares/auth');
const staticRoute = require('./Routes/staticRouter');
const userRoute = require('./Routes/user');
const path = require('path');
const {connectMongoDB} = require('./Connection/connect');
const URL = require('./Models/url');

const app = express();
const PORT = 8001;

connectMongoDB("mongodb://localhost:27017/urlShortener")

app.set('view engine', 'ejs');
app.set("Views", path.resolve("./Views"));
// Middleware
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookiesParser());
app.use(checkForAuthentication);

// Routes
// app.get("/test" , async(req,res) => {
//   const allURL = await URL.find({});
//   return res.render("home", {
//     urls : allURL,
//   });
// })
app.use("/url",restrictTo(["NORMAL","ADMIN"]), urlRoute);
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.use("/" , staticRoute);
app.use("/user" , userRoute);
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );

  if (!entry) {
    console.error("No entry found for shortId:", shortId);
    return res.status(404).send("URL not found");
  }

  return res.redirect(entry.redirectedUrl);
});



app.listen(PORT, () => {
  console.log(`Port started at PORT: ${PORT}`);
})