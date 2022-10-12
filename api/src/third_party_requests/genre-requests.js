const axios = require('axios');
const {API_KEY} = process.env;
const {Genre} = require('../db.js');

const bringGenres = async () => {
  await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
  .then((response) => {
    const data = response.data.results;
    data.map((genre, index) => {
      let nombre = {id:index+1, name: genre.name};
      let add_genre = Genre.create(nombre);
    });
  });
  console.log('genre petition made');
};

module.exports = {
  bringGenres
}