/**
 * Copy text to clipboard.
 * @param text - Text to be copied
 */
function copyToClipboard(text: string): void {  
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Teks berhasil disalin ke clipboard.");
      })
      .catch((err) => {
        console.error("Gagal menyalin teks ke clipboard: ", err);
      });
  } else {
    // Clipboard API tidak tersedia, fallback ke metode lama
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      console.log("Teks berhasil disalin ke clipboard.");
    } catch (err) {
      console.error("Gagal menyalin teks ke clipboard: ", err);
    }
    document.body.removeChild(textArea);
  }
}

export default copyToClipboard;
