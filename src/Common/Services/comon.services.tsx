export const formatDate = (dateString: string): string => {
 const date = new Date(dateString);
 const month = date.toLocaleString("default", { month: "long" });
 const day = date.getDate();
 const ordinalSuffix = getOrdinalSuffix(day);
 const year = date.getFullYear();

 return `${month} ${day}${ordinalSuffix} ${year}`;
};

const getOrdinalSuffix = (day: number): string => {
 if (day >= 11 && day <= 13) {
  return "th";
 }
 const lastDigit = day % 10;
 switch (lastDigit) {
  case 1:
   return "st";
  case 2:
   return "nd";
  case 3:
   return "rd";
  default:
   return "th";
 }
};
