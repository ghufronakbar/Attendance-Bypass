import { SECRET_KEY } from "@/constant";
import CryptoJS from "crypto-js";

/* 
  Function: getCourseCode
  Params:
    - code (string): Encrypted string.
  
  Return:
    - If decryption is successful: Returns the course code <string>.
    - If decryption fails: Returns an error <Error>.
*/
const getCourseCode = (code: string): string | Error => {
  const decrypted = CryptoJS.AES.decrypt(code, SECRET_KEY);
  const decryptedResult = decrypted.toString(CryptoJS.enc.Utf8);

  if (decryptedResult === "") {
    return new Error("Invalid code");
  } else {
    return decryptedResult.split(",")[0];
  }
};

export default getCourseCode;
