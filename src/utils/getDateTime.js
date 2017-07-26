export const getDateTime = (postDateTime, callback) => {
  const newDate = new Date(postDateTime);
  const result = newDate.getDate() + '/' +
                (newDate.getMonth() + 1) + '/' +
                newDate.getFullYear() + ' ' +
                newDate.getHours() + ':' +
                newDate.getMinutes();
  callback(result)
}