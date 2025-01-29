// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const comments = require('./comments.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GET /comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// POST /comments
app.post('/comments', (req, res) => {
  const { body } = req;
  if (!body) {
    return res.status(400).json({ message: 'Invalid request' });
  }

  const newComment = {
    id: comments.length + 1,
    body: body.body,
    username: body.username,
    created_at: new Date().toISOString(),
  };

  comments.push(newComment);
  fs.writeFileSync('./comments.json', JSON.stringify(comments, null, 2));

  res.json(newComment);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});