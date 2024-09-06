import { History } from "@/models/History";
import { HISTORY_KEY } from "@/constant";

const addHistory = async (history: History): Promise<boolean | Error> => {
  try {
    const token = localStorage.getItem(HISTORY_KEY);
    if (!token) {
      localStorage.setItem(HISTORY_KEY, JSON.stringify([]));
    } else {
      const data = JSON.parse(token);
      data.push(history);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(data));
    }
    return true;
  } catch (error) {
    return new Error("Failed to add history");
  }
};

export default addHistory;
