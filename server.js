import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory storage for product ratings (aggregated)
const ratingsDB = {
  '1': { value: 4.5, count: 120 },
  '2': { value: 3.8, count: 85 },
  '3': { value: 5.0, count: 200 },
};

// In-memory storage for user ratings (user -> product -> rating)
const userRatings = {};

// GET /api/ratings/:id - Get rating by ID
app.get('/api/ratings/:id', (req, res) => {
  const { id } = req.params;
  const rating = ratingsDB[id];

  if (!rating) {
    return res.status(404).json({ value: 0, count: 0 });
  }

  setTimeout(() => {
    res.json({ value: rating.value, count: rating.count });
  }, 500);
});

// POST /api/ratings/:id - Submit a new rating for current user
app.post('/api/ratings/:id', (req, res) => {
  const { id } = req.params;
  const { rating: newRating } = req.body;
  const userId = req.headers['x-user-id'] || 'guest'; // Simulated user ID

  if (!ratingsDB[id]) {
    return res.status(404).json({ error: 'Rating not found' });
  }

  if (newRating < 1 || newRating > 5 || isNaN(newRating)) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }

  // Update product rating stats
  const oldRating = userRatings[userId]?.[id] || 0;
  ratingsDB[id].count = Math.max(ratingsDB[id].count, 1);

  const totalBefore = ratingsDB[id].value * ratingsDB[id].count;
  const newTotal = totalBefore - oldRating + newRating;
  ratingsDB[id].value = parseFloat((newTotal / ratingsDB[id].count).toFixed(1));

  // Store user's rating
  if (!userRatings[userId]) {
    userRatings[userId] = {};
  }
  userRatings[userId][id] = newRating;

  setTimeout(() => {
    res.json({ value: ratingsDB[id].value, count: ratingsDB[id].count });
  }, 300);
});

// PUT /api/ratings/:id - Update the user's last rating
app.put('/api/ratings/:id', (req, res) => {
  const { id } = req.params;
  const { rating: updatedRating } = req.body;
  const userId = req.headers['x-user-id'] || 'guest';

  if (!ratingsDB[id]) {
    return res.status(404).json({ error: 'Rating not found' });
  }

  if (updatedRating < 1 || updatedRating > 5 || isNaN(updatedRating)) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }

  // Get previous rating for this user
  const prevRating = userRatings[userId]?.[id] || 0;

  const totalBefore = ratingsDB[id].value * ratingsDB[id].count;
  const newTotal = totalBefore - prevRating + updatedRating;
  ratingsDB[id].value = parseFloat((newTotal / ratingsDB[id].count).toFixed(1));

  // Update user's rating
  userRatings[userId][id] = updatedRating;

  setTimeout(() => {
    res.json({ value: ratingsDB[id].value, count: ratingsDB[id].count });
  }, 300);
});

// DELETE /api/ratings/:id - Remove the user's rating
app.delete('/api/ratings/:id', (req, res) => {
  const { id } = req.params;
  const userId = req.headers['x-user-id'] || 'guest';

  if (!ratingsDB[id]) {
    return res.status(404).json({ error: 'Rating not found' });
  }

  const userRating = userRatings[userId]?.[id] || 0;

  if (userRating > 0) {
    const totalBefore = ratingsDB[id].value * ratingsDB[id].count;
    const newTotal = totalBefore - userRating;
    ratingsDB[id].value = parseFloat((newTotal / ratingsDB[id].count).toFixed(1));
  }

  // Remove user's rating
  if (userRatings[userId] && userRatings[userId][id]) {
    delete userRatings[userId][id];
  }

  setTimeout(() => {
    res.json({ value: ratingsDB[id].value, count: ratingsDB[id].count });
  }, 300);
});

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
