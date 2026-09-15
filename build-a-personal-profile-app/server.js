const express  = require('express');

const app = express();
const port = 3000;
// const jokes = [
//   "Why do programmers prefer dark mode? Because light attracts bugs!",
//   "There are only 10 kinds of people in the world: those who understand binary and those who don't.",
//   "I told my computer I needed a break, and it said \"No problem, I'll go to sleep.",
//   "Why do Java developers wear glasses? Because they don't see sharp.",
// ];

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Camper Bot's homepage!");
});

app.get("/hobbies", (req, res) => {
  res.status(200).send("I cycle, go boating, and play guitar.");
});

app.get("/skills", (req, res) => {
  res.status(200).send("JavaScript, Node.js, and Express.js!");
});

app.get("/api/profile", (req, res) => {
  res.status(200).json({ 
    name: 'Camper Bot',
    hobbies: ['cycling', 'boating', 'guitar'],
    skills: ['JavaScript', 'Node.js', 'Express.js']
  });
});

app.listen(port, () => {
  console.log("Server is running on port 3000");
}); 