const express = require('express');
const connectDB = require('./db');
const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/rider', require('./routes/rider.js'));
app.use('/api/driver', require('./routes/driver.js'));
app.use('/api/cab', require('./routes/Cab.js'));

app.listen(PORT, () => {
    console.log('Listening on port 3000');
    console.log(`backend server is running on http://localhost:${PORT}`);
}
);
