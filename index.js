const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { resolve } = require('path');

dotenv.config();

const app = express();
const port = 3010;

// Middleware
app.use(express.json());
app.use(express.static('static'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
const signupRoutes = require('./routes');
app.use(signupRoutes);

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
