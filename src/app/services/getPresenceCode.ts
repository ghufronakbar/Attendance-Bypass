import { SECRET_KEY } from "@/constant";

const date = new Date();
/* 
  Fungsi: getPresenceCode
  Parameter:
    - courseCode (string): Kode mata kuliah yang akan dienkripsi.
    - meeting (number): Nomor pertemuan (harus antara 1 hingga 14).
    - time (number): Durasi pertemuan dalam menit.
  
  Return:
    - Jika parameter valid: Mengembalikan string terenkripsi yang berisi data kehadiran (course code, meeting number, tanggal, waktu mulai, dan waktu berakhir).
    - Jika meeting number tidak valid: Mengembalikan `Error` dengan pesan "Invalid meeting number".
*/
export const getPresenceCode = (courseCode: string, meeting: number, time: number): string | Error => {
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
  