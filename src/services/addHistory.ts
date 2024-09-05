import { History } from "@/models/History";
import Cookie from "js-cookie";
import { EXPIRES, HISTORY_KEY } from "@/constant";

const addHistory = async (history: History): Promise<boolean | Error> => {
  try {
    const token = Cookie.get(HISTORY_KEY);
    if (!token) {
      Cookie.set(HISTORY_KEY, JSON.stringify([]), {
        expires: EXPIRES,
      });
    } else {
      const data = JSON.parse(token);
      data.push(history);
      Cookie.set(HISTORY_KEY, JSON.stringify(data), {
        expires: EXPIRES,
      });
    }
    return true;
  } catch (error) {
    return new Error("Failed to add history");
  }
};

export default addHistory;
