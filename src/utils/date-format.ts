export const formatteDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  let month = String(today.getMonth() + 1).padStart(2, "0");
  let day = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${year}${month}${day}`;
  return formattedDate;
};
