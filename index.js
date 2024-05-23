const express = require('express');
const app = express();

const data = require('./data.js');
// JSON data
const jsonData = data.jsonData


// Endpoint to serve the JSON data
app.get('/api/music', (req,res) => {
    res.json(jsonData);
});


// app.get('/api/music/:id', (req, res) => {
//     const id = req.params.id; // Retrieve the ID from the request parameters
//     const musicItem = jsonData.data.find(item=> 
//         item.id ==id
//     )
//     if (musicItem) {
//       res.json(musicItem); // If the music item is found, send it as a response
//     } else {
//       res.status(404).json({ error: 'Music item not found' }); // If not found, send a 404 error response
//     }
//   });

// Route to get music data by singer name
// Route to get music data by singer name using query parameters
// Route to get music data by singer name using query parameters
app.get('/api/music/data/:name', (req, res) => {
  const singerName = req.params.name; // Retrieve the singer name from the query parameters

  let songsBySinger = [];

  if (Array.isArray(jsonData)) {
      // If jsonData is an array, filter by singer name
      songsBySinger = jsonData.filter(item => item.singer_name === singerName);
  } else if (Array.isArray(jsonData.data)) {
      // If jsonData is an object with a 'data' property that is an array, filter by singer name from 'data'
      songsBySinger = jsonData.data.filter(item => item.singer_name === singerName);
  }

  if (songsBySinger.length > 0) {
      res.json(songsBySinger); // If songs by the singer are found, send them as a response
  } else {
      res.status(404).json({ error: 'Songs by this singer not found' }); // If not found, send a 404 error response
  }
});




// app.get('/api/music/?id:', (req, res) => {
//     const id = req.query.id; // Retrieve the ID from the request parameters
//     const musicItem = jsonData.data.find(item=> 
//         item.id ==id
//     )
//     if (musicItem) {
//       res.json(musicItem); // If the music item is found, send it as a response
//     } else {
//       res.status(404).json({ error: 'Music item not found' }); // If not found, send a 404 error response
//     }
//   });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
