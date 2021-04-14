export const getFormattedDate = (date) => {
  const month = (`0${date.getMonth() + 1}`).slice(-2);
  const day = (`0${date.getDate()}`).slice(-2);
  const year = date.getFullYear();
  const hour = date.toLocaleString([], {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
  });

  return `${month}/${day}/${year} ${hour}`;
};
