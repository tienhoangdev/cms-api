import "dotenv/config";
import express from "express";
const app = express();
const port = process.env.PORT || 3000;
import sequelize from "./libs/database.js";
import cors from "cors";
import "./crons/index.js";
import { checkBucketConnection } from "./libs/minio.js";

app.use(express.json()); // for parsing application/json
app.use(cors());

// Sync the models to database
sequelize
  .sync({ force: false }) // Set `force: true` to drop and recreate tables
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((err) => console.error("Unable to create tables:", err));
import articleRoute from "./routes/articles.route.js";

// Use routes
app.use("/articles", articleRoute);

app.get("/health-check", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Service is up and running",
    timestamp: new Date().toISOString(),
  });
});

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
  // Checking connection to other services
  const { CMS_DATA_MINIO_BUCKET_NAME: cmsDataBucketName } = process.env;
  // TODO: Support check multiple buckets
  await checkBucketConnection(cmsDataBucketName);
});
