import moment from "moment";
const formatDate = (date) => {
  const d = moment(date, "YYYY-MM-DD HH:mm:SS").format("MMMM D, YYYY ");
  const t = moment(date, "YYYY-MM-DD HH:mm:SS").format("hh:mm A");
  return `${d} AT ${t}`;
};

export default formatDate;
