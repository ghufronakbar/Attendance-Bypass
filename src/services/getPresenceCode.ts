import { SECRET_KEY } from "@/constant";
import CryptoJS from "crypto-js";

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
  meeting: number
): Promise<string | Error> => {
  const date = new Date();
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

  console.log(dateNow());

  const dataToEncrypt = `${courseCode},${meeting},${dateNow()},00:01,23:59`;
  const encrypted = CryptoJS.AES.encrypt(dataToEncrypt, SECRET_KEY);
  const encryptedString = encrypted.toString();
  return encryptedString;
};
