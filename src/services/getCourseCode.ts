import { SECRET_KEY } from "@/constant";
import CryptoJS from "crypto-js";

/* 
  Fungsi: getCourseCode
  Parameter:
    - code (string): Ini adalah string terenkripsi yang berisi informasi tentang course.
  
  Return:
    - Jika dekripsi berhasil: Mengembalikan string yang merupakan kode mata kuliah (course code).
    - Jika dekripsi gagal: Mengembalikan `Error` dengan pesan "Invalid code".
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
