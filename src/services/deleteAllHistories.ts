import { HISTORY_KEY } from "@/constant";

const deleteAllHistories = () => {    
    localStorage.setItem(HISTORY_KEY, JSON.stringify([]));
};

export default deleteAllHistories