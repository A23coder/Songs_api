const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 5000;

// Read the JSON file
const rawData = fs.readFileSync(__dirname + "/" + "data.json");
const data = JSON.parse(rawData);

// Get all data
app.get("/api/data", (req, res) => {
  res.json(data.data);
});

// Get data by ID
app.get("/api/data/:id", (req, res) => {
  const id = req.params.id;
  const item = data.data.find((item) => item.id === id.toString());
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// Get data by singer name
app.get("/api/data/singer/:singer_name", (req, res) => {
  const singer_name = req.params.singer_name;
  console.log(typeof singer_name);
  const items = data.data.filter((item) => item.singer_name === singer_name);
  if (items.length > 0) {
    res.json(items);
  } else {
    res.status(404).json({ message: "No items found for this singer name" });
  }
});

function capitalizeEachWord(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

app.get("/api/data/song/:song_name", (req, res) => {
  let songName = req.params.song_name;
  
  // Capitalize the first letter of each word in the song name
  songName = capitalizeEachWord(songName);
  console.log(songName)
  const items = data.data.filter((item) => item.music_name === songName);

  if (items.length > 0) {
    res.json(items);
  } else {
    res.status(404).json({ message: "No song found" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
