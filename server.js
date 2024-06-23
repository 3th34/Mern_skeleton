// server.js

import config from './client/config/config.js'; // Adjust path as per your project structure
import app from './server/express.js'; // Adjust path as per your project structure
import mongoose from 'mongoose';
import router from './server/routes/product.route.js'; // Adjust path as per your project structure

mongoose.Promise = global.Promise;

// MongoDB connection setup
mongoose.connect('mongodb+srv://essene60:mommydear@marketplace.ki0qdyk.mongodb.net/marketplace', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
.then(() => {
  console.log("Confirmation! Connected to MongoDB");
})
.catch((error) => {
  console.error("Unable to connect to database:", error);
  throw new Error(`Unable to connect to database: ${config.mongoUri}`);
});

mongoose.connection.on('error', (err) => {
  console.error("MongoDB connection error:", err);
  throw new Error(`MongoDB connection error: ${config.mongoUri}`);
});

// Middleware and routes setup
app.use('/', router);

// Basic route for testing
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the User application." });
});

// Start server
const PORT = config.port || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
