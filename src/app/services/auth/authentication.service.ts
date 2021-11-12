import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EncryptService} from "../encrypt/encrypt.service";
import {LoginPayload, UserToken} from "../../models/interfaces/auth";
import {Observable} from "rxjs";
import {LOGIN_URL, TOKEN_KEY} from "../../utils/constants";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private httpClient: HttpClient,
    private encrypter: EncryptService
  ) { }

  userLogin(userLogin: LoginPayload): Observable<UserToken> {
    userLogin.client_id = environment.client_id;
    userLogin.client_secret = environment.client_secret;
    userLogin.grant_type = environment.grant_type;
    return this.httpClient.post<UserToken>(LOGIN_URL, userLogin);
  }

  storeEntry(key: string, value: any): void {
    localStorage.setItem(key, this.encrypter.encrypt(value));
  }

  getEntry(key: string): any {
    return this.encrypter.decrypt(localStorage.getItem(key));
  }

  isAuth() {
    return !!(this.getEntry(TOKEN_KEY) as string);
  }

  getToken() {
    return (this.getEntry(TOKEN_KEY) as UserToken).access_token;
  }

  logout() {
    localStorage.clear();
  }

}
