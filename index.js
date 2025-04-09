const express = require('express');
const urlRoute = require('./Routes/url');
const {connectMongoDB} = require('./Connection/connect');
const URL = require('./Models/url');

const app = express();
const PORT = 8001;

connectMongoDB("mongodb://localhost:27017/urlShortener")
// Middleware
app.use(express.json());
// app.use(express.urlencoded({extended : true}));

// Routes
app.use("/url" , urlRoute);
app.get("/:shortId" ,async (req,res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate({
    shortId
  }, {$push : 
    {visitHistory : {timestamp : Date.now()}}
  })
  return res.redirect(entry.redirectedUrl);
})

app.listen(PORT, () => {
  console.log(`Port started at PORT: ${PORT}`);
})