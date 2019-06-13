var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Comment = require('../models/comment');


/* GET home page for Registration of user. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// POST request to store users in database
router.post('/', async function (req, res, next) {
  var userModel = await new User(req.body);
  userModel.address.street = req.body.street;
  userModel.address.city = req.body.city;
  userModel.address.state = req.body.state;
  console.log(userModel);

  await userModel.save();
  res.sendStatus(200);
});

// GET request to view all user details
router.get('/view',async (req,res)=>{
  var res = await User.find({},(err,doc)=>{
    res.sendStatus(doc);

  });
});

// DELETE request to delete users based on id
router.delete('/delete/:id', async (req, res) => {
  await User.findOneAndRemove({ _id: req.params.id }, (err, doc) => {
    if (err)
      res.sendStatus(500);
    else
      res.sendStatus(200);

  });
});

// GET request to search by interest.
router.get('/find/:interest', async (req, res) => {
  await User.find({ interests: { $in: req.params.interest } }, (err, doc) => {
    if (err)
      res.sendStatus(500);
    else
      res.sendStatus(doc);
  });
});

//POST request to comment on a particular user.
router.post('/comment', async (req, res) => {
  var comment = new Comment();
  comment.from = req.body.from;
  comment.to = req.body.to;
  comment.message = req.body.message;
  await comment.save(async (err, doc) => {
    if (err)
      res.sendStatus(503);
    else {
      await User.findOneAndUpdate({ _id: req.body.from }, { $push: { commentid: doc._id } });
      res.sendStatus(200);
    }
  })
});


// GET request to get all comments by an user
router.get('/getcomments', async (req, res) => {
  var comments = await Comment.find({ from: req.body.id });
  res.sendStatus(comments);
});


module.exports = router;
