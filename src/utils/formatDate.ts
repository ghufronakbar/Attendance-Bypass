/**
 * 
 * @param dateString - Date in format <string> "YYYY-MM-DDTHH:mm:ss.000Z"
 * @returns Date in format <string> "Dayname, DD MMMM YYYY"
 */
const formatDate = (dateString: string) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(dateString);

  const dayName = days[date.getUTCDay()];
  const day = date.getUTCDate();
  const monthName = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${dayName}, ${day} ${monthName} ${year}`;
};

export default formatDate;
