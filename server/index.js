const db = require('../database/index.js');
const githubHeler = require('../helpers/github.js');
const express = require('express');
let app = express();
// built in body-parser
app.use(express.urlencoded({extended: true}));
// app.use(express.json())
app.use(express.static(__dirname + '/../client/dist'));

// This route should take the github username provided
// and get the repo information from the github API, then
// save the repo information in the database
app.post('/repos', function (req, res) {
  githubHeler.getReposByUsername(req.body.username, (data, err) => {
    if (err) {
      res.status(404);
    } else {
      data.map(repo => {
        return {
          username: repo.owner.login,
          id: repo.owner.id,
          url: repo.html_url,
          watchers: repo.watchers_count
        }
      })
      .forEach(modRepo => {
        db.save(modRepo);
      });
      res.status(200);
    }
  })
});

// This route should send back the top 25 repos
app.get('/repos', function (req, res) {
  db.Repo.find().sort('-watchers').limit(25).exec().then((data, err) => {
    if (err) {
      res.status(404);
    } else {
      res.send(data);
      res.status(200);
    }
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

