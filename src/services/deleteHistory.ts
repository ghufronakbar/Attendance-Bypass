import { HISTORY_KEY } from "@/constant";
import getHistory from "./getHistory";

const deleteHistory = (code: string) => {
  const histories = getHistory();
  if (histories) {
    const find = histories.find((item) => item.code === code);
    if (find) {
      const index = histories.indexOf(find);
      histories.splice(index, 1);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(histories));
    }
  } else {
    localStorage.setItem(HISTORY_KEY, JSON.stringify([]));
  }
};

export default deleteHistory;
