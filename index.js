require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const sequelize = require("./libs/database");

app.use(express.json()); // for parsing application/json

// Sync the models to database
sequelize
  .sync({ force: false }) // Set `force: true` to drop and recreate tables
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((err) => console.error("Unable to create tables:", err));

// Import routes
// const postRoutes = require("./routes/posts.route");
// const categoryRoutes = require('./routes/categoryRoutes');
// const topicRoutes = require('./routes/topicRoutes');
const articleRoute = require("./routes/articles.route");

// Use routes
app.use("/articles", articleRoute);
// app.use('/categories', categoryRoutes);
// app.use('/topics', topicRoutes);

app.get("/health-check", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Service is up and running",
    timestamp: new Date().toISOString(),
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
