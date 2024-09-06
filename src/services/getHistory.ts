import { History } from "@/models/History";
import { HISTORY_KEY } from "@/constant";

const getHistory = (): History[] => {
  const code = localStorage.getItem(HISTORY_KEY);
  try {
    if (code) {
      const data = JSON.parse(code);
      const reversedData = [...data].reverse();
      return reversedData;
    } else {
      localStorage.setItem(HISTORY_KEY, JSON.stringify([]));
      return [];
    }
  } catch (error) {
    localStorage.setItem(HISTORY_KEY, JSON.stringify([]));
    return [];
  }
};

export default getHistory;
