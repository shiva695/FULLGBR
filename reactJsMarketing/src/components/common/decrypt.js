import CryptoJS from "crypto-js";
import { config } from "../../config/config";

export function decryptData(data) {
  const bytes = CryptoJS.AES.decrypt(data, config.decryptSecretKey);
  const originalData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return originalData;
}
