import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environment';


const keyChain: string = environment.key || '';
const ivChain: string = environment.iv || '';
const key = CryptoJS.enc.Hex.parse(keyChain);
const iv = CryptoJS.enc.Hex.parse(ivChain);

const encrypt = (data: object) => {
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, { iv });
  return {data: encrypted.toString()};
}

const decrypt = (data: any): string => {
  const decrypted = CryptoJS.AES.decrypt(data, key, { iv });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
export { encrypt, decrypt };