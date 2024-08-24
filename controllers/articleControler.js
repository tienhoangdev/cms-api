const Articles = require("../models/articles.model");
const { generatePresignedUrl } = require("../libs/minio");
const { allowedFileExtensions } = require("../consts");
const path = require("path");

const articlesController = {
  createArticle: async (req, res) => {
    try {
      const { title, description, keywords } = req.body;
      const newArticle = await Articles.create({
        title,
        description,
        keywords,
      });
      return res.status(200).json(newArticle);
    } catch (error) {
      console.error("Error in createArticle", error?.stack);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },
  uploadArticleContent: async (req, res) => {
    try {
      const { CMS_DATA_MINIO_BUCKET_NAME: cmsDataBucketName } = process.env;
      const { articleId } = req.params;
      // User can upload mutiple files
      const { files } = req.body;
      let response = {};
      // Validate files extension
      files.forEach((fileName) => {
        const fileExtension = path.extname(fileName);
        if (!allowedFileExtensions.includes(fileExtension)) {
          return res.status(400).json({
            message: `File type: ${fileExtension} is not allowed for upload`,
          });
        }
      });
      let promises = [];
      for (const fileName of files) {
        const fileKey = `${articleId}/${fileName}`;
        promises.push(
          generatePresignedUrl(cmsDataBucketName, fileKey).then(
            (presignedUrl) => {
              response[fileName] = presignedUrl;
            },
          ),
        );
      }
      await Promise.all(promises).then((values) => {
        console.log("[Tim] promise all result", values);
      });
      return res.status(200).json({ data: response });

      // With each files, generate a presigned url for it
    } catch (error) {
      console.error("Error in uploadArticleContent", error?.stack);
      res.status(500).json({ message: "Something went wrong" });
    }
  },
};

module.exports = articlesController;
