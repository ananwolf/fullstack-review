const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  username: String, //owner.login/unique
  id: {type: Number, unique: true}, //owner.id
  url: String, //owner.html_url
  watchers: Number //watchers
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  let newRepo = new Repo({
    username: repo.username,
    id: repo.id,
    url: repo.url,
    watchers: repo.watchers
  }).save((err, data) => {
    if (err) {
      console.log(`I'm a teapot`, err);
    } else {
      console.log('Tea brewed')
    }
  });
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
};

module.exports.save = save;