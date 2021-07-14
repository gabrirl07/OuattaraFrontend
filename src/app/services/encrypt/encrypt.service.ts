import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class EncryptService {
  constructor() {}

  encrypt(payload: any) {
    return CryptoJS.AES.encrypt(
      JSON.stringify(payload),
      environment.encryptPassword
    ).toString();
  }

  decrypt(encryption: any) {
    if (encryption) {
      return JSON.parse(
        CryptoJS.AES.decrypt(encryption, environment.encryptPassword).toString(
          CryptoJS.enc.Utf8
        )
      );
    }

    return null;
  }
}
