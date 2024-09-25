import yup from "yup";
export const getArticleListSchema = yup.object().shape({
  page: yup
    .number("page must be a number")
    .min(1, "Page can't be smaller than 1")
    .default(1)
    .required(),
  pageSize: yup
    .number("pageSize must be a number")
    .min(5, "pageSize can't be smaller than 5")
    .max(20, "pageSize can't be bigger than 20")
    .default(10)
    .required(),
});
export const articleUpdateSchema = yup.object().shape({
  title: yup
    .string()
    .max(300, "Article title can't be longer than 300 characters")
    .notRequired(),
  description: yup.string(),
  keywords: yup.array().of(yup.string()),
});
