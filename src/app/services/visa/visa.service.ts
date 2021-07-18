import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserToken} from "../../models/auth";
import {LOGIN_URL, VISA_LIST_URL} from "../../utils/constants";
import {Visa, VisaList} from "../../models/visa/visa";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VisaService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getVisaListWithLimit(): Observable<VisaList> {
    return this.httpClient.get<VisaList>(`${VISA_LIST_URL}?limit=30`);
  }

  getVisaList(): Observable<VisaList> {
    return this.httpClient.get<VisaList>(`${VISA_LIST_URL}`);
  }

  getVisa(visaId: string): Observable<Visa> {
    return this.httpClient.get<Visa>(`${VISA_LIST_URL}/${visaId}`);
  }
}
