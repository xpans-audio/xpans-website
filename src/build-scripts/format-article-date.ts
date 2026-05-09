const options: object = {
  year: "numeric",
  month: "long",
  day: "numeric",
};
export function formatArticleDate(date: Date) {
  return date.toLocaleDateString("en-US", options);
}
