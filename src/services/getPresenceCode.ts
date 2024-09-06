import { SECRET_KEY } from "@/constant";
import CryptoJS from "crypto-js";

const date = new Date();
/* 
  Function: getPresenceCode
  Params:
    - courseCode (string): Course code that got from getCourseCode.
    - meeting (number): Meeting number (1-14).
    - time (number): Time in minutes.
  
  Return:
    - If encryption is successful: Returns the meeting code <string>.
    - If encryption fails: Returns an error <Error>.
*/
export const getPresenceCode = async (
  courseCode: string,
  meeting: number,
  time: number
): Promise<string | Error> => {
  if (meeting < 1 || meeting > 14) {
    return new Error("Invalid meeting number");
  }

  const dateNow = (): string => {
    return (
      date.getFullYear().toString().padStart(4, "0") +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0")
    );
  };

  const timeStart = (): string => {
    return (
      date.getHours().toString().padStart(2, "0") +
      ":" +
      date.getMinutes().toString().padStart(2, "0")
    );
  };

  const timeEnd = (): string => {
    date.setMinutes(date.getMinutes() + time);
    return (
      date.getHours().toString().padStart(2, "0") +
      ":" +
      date.getMinutes().toString().padStart(2, "0")
    );
  };

  const dataToEncrypt = `${courseCode},${meeting},${dateNow()},${timeStart()},${timeEnd()}`;
  const encrypted = CryptoJS.AES.encrypt(dataToEncrypt, SECRET_KEY);
  const encryptedString = encrypted.toString();

  return encryptedString;
};
