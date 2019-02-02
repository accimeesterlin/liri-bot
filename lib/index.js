
require('dotenv').config();



const axios = require('axios');
const Spotify = require('node-spotify-api');


const command = process.argv[2];
const value = process.argv[3];
 
const spotify = new Spotify({
  id: process.env.SPOTIY_ID,
  secret: process.env.SPOTI_SECRET
}); // create an instance


function getMeSpotify(item) {
    spotify.search({ type: 'track', query: item, limit: 10 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data); 
      });
}


function getMyBands(artist) {

    const url = 'https://rest.bandsintown.com/artists/'  + artist  +  '/events?';
    // Optionally the request above could also be done as
    axios.get(url, {
            params: {
                app_id: 'codingbootcamp'
            }
        })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}


switch(command) {
    case 'concert-this':
        getMyBands(value);
        break;
    case 'spotify-this-song':
        getMeSpotify(value);
        break;

    default:
        console.log('Please enter the following \n liri spotify-this-song song_name \n liri concert-this band_name');
};
