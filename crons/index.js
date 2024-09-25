import cron from "node-cron";
import sequelize from "../libs/database.js";
import { articleCountByKeywordCache } from "../libs/cache.js";

// Refresh the article count by keyword every 5 minute
cron.schedule("* * * * *", async () => {
  try {
    const queryStm = `
      select keywords as keyword, count(*)
      from (select jsonb_array_elements_text(keywords) as keywords
            from articles) as unnested_keywords
      group by keyword;
    `;
    await sequelize.query(queryStm).then(([results]) => {
      results.forEach(({ keyword, count }) => {
        articleCountByKeywordCache.set(keyword, count);
      });
    });
  } catch (error) {
    console.log("Error in cron: Get articles count by keywords", error);
  }
});
