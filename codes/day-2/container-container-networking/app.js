const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios').default;
const mongoose = require('mongoose');

const Favorite = require('./models/favorite');

const app = express();

app.use(bodyParser.json());

app.get('/favorites', async (req, res) => {
  const favorites = await Favorite.find();
  res.status(200).json({
    favorites: favorites,
  });
});

app.post('/favorites', async (req, res) => {
  const favName = req.body.name;
  const favType = req.body.type;
  const favUrl = req.body.url;

  try {
    if (favType !== 'movie' && favType !== 'character') {
      throw new Error('"type" should be "movie" or "character"!');
    }
    const existingFav = await Favorite.findOne({ name: favName });
    if (existingFav) {
      throw new Error('Favorite exists already!');
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  const favorite = new Favorite({
    name: favName,
    type: favType,
    url: favUrl,
  });

  try {
    await favorite.save();
    res
      .status(201)
      .json({ message: 'Favorite saved!', favorite: favorite.toObject() });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

app.get('/movies', async (req, res) => {
  try {
    const response = await axios.get('https://swapi.dev/api/films');
    res.status(200).json({ movies: response.data });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

app.get('/people', async (req, res) => {
  try {
    const response = await axios.get('https://swapi.dev/api/films');
    res.status(200).json({ people: response.data });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});
// app.listen(3000, () => console.log('server is running on port 3000'))

//local connection string
// const CONNECTION_STRING = 'mongodb://localhost:27017/swfavorites';

//if mongodb is running in host machine
// const CONNECTION_STRING = 'mongodb://host.docker.internal:27017/swfavorites';

//mongodb is running in separate container and another container is trying to access it (use IP address instaed of localhost)
// const CONNECTION_STRING = 'mongodb://172.17.0.2:27017/swfavorites'


//mongodb is running in separate container under some network and having DNS name same as that of the container name and another container is trying to access it (use DNS name instaed of localhost)
const CONNECTION_STRING = 'mongodb://mongoserver:27017/swfavorites'

mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true }
).then(
  (value) => {
    console.log(value.connection);
    app.listen(3000, () => console.log('server is running on port 3000'))
  },
  (err) => {
    console.log(err);
  }
);
