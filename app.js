// Setup
let express = require('express');
let app = express();
let mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/node-blog")

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var postSchema = new mongoose.Schema({ body: String });
var Post = mongoose.model('Post', postSchema);

app.post('/addpost', (req, res) => {
  let postData = new Post(req.body);
  postData.save().then( result => {
    res.redirect('/');
  }).catch(err => {
    res.status(400).send("Unable to save data");
  });
});

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Routes
app.get("/", (req, res) => {
  Post.find({}, (err, posts) => {
    res.render('index', { posts: posts })
  });
});

// Listen
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
