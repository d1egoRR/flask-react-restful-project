export const getDateTime = (postDateTime, callback) => {
  const result = postDateTime
                  .split(" ")[0]
                  .split("-")
                  .reverse()
                  .join("/");
  callback(result)
}