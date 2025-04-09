const {nanoid} = require('nanoid');
const URL = require('../Models/url');

async function handleGenerateNewShortUrl(req,res){
  const shortId = nanoid(8);
  const body = req.body;
  if(!body.url) 
    return res.status(400).json({error : "Please provide a url"});
  await URL.create({
    shortId : shortId,
    redirectedUrl : body.url,
    vistHistory : [] ,
  })
  return res.json({ id : shortId });
}

async function handleGetAnalytics(req,res){
  const shortId = req.params.shortId;
  const result = await URL.findOne({shortId});
  if(!result) 
    return res.status(404).json({error : "No url found"});
  return res.json({
    totalClicks : result.visitHistory.length,
    analytics : result.visitHistory
  })
}

module.exports = {
  handleGenerateNewShortUrl,
  handleGetAnalytics,
}