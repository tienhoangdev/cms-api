const { DataTypes, DATE } = require("sequelize");
const sequelize = require("../libs/database");

const Article = sequelize.define(
  "Article",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true, // Set to false if description is required
    },
    keywords: {
      type: DataTypes.JSONB,
      defaultValue: [],
      allowNull: false, // Set to false if keywords are required
    },
    storage_prefix: {
      type: DataTypes.STRING,
      allowNull: true, // Set to false if storage_prefix is required
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "articles",
    timestamps: false, // Set to true if you want Sequelize to manage createdAt and updatedAt fields
  },
);

module.exports = Article;
