import CryptoJS from 'crypto-js';

export const encryptNote = (content, password) => {
  try {
    return CryptoJS.AES.encrypt(content, password).toString();
  } catch (error) {
    console.error('Encryption failed:', error);
    return null;
  }
};

export const decryptNote = (encryptedContent, password) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedContent, password);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    if (!decrypted) {
      throw new Error('Invalid password');
    }
    return decrypted;
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
};