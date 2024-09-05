import Cookie from "js-cookie";
import { EXPIRES, HISTORY_KEY } from "@/constant";
import getHistory from "./getHistory";

const deleteHistory = (code: string) => {
  const histories = getHistory();
  if (histories) {
    const find = histories.find((item) => item.code === code);
    if (find) {
      const index = histories.indexOf(find);
      histories.splice(index, 1);
      Cookie.set(HISTORY_KEY, JSON.stringify(histories), {
        expires: EXPIRES,
      });
    }
  } else {
    Cookie.set(HISTORY_KEY, JSON.stringify([]), {
      expires: EXPIRES,
    });
  }
};

export default deleteHistory;
