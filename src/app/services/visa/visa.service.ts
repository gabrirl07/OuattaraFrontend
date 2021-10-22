import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_URL, VISA_LIST_URL} from "../../utils/constants";
import {Visa, VisaList} from "../../models/visa/visa";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VisaService {

  public VISA_LIST_PAGINATION_STEP = 10;
  private VISA_LIST_PAGINATION_URL = `${VISA_LIST_URL}?limit=${this.VISA_LIST_PAGINATION_STEP}`;


  constructor(
    private httpClient: HttpClient
  ) { }

  getVisaList(page: any = 1): Observable<any> {
    return this.httpClient.get<any>(`${this.VISA_LIST_PAGINATION_URL}&page=${page}`);
  }

  getVisa(visaId: string): Observable<Visa> {
    return this.httpClient.get<Visa>(`${VISA_LIST_URL}/${visaId}`);
  }

  getDashboardStats(): Observable<any> {
    return this.httpClient.get<any>(`${BASE_URL}/stats`);
  }

  getVisaDocuments(visaId: string): Observable<any> {
    return this.httpClient.get<any>(`${VISA_LIST_URL}/${visaId}/passport/documents`);
  }

  updateStatus(visaId: string, status: any): Observable<any> {
    return this.httpClient.post<any>(`${VISA_LIST_URL}/${visaId}/status/update`, status);
  }

  filterVisaList(search: any, page: any = 1) {
    if (search.name) return this.httpClient.get<any>(`${this.VISA_LIST_PAGINATION_URL}&page=${page}&filter=${search.name}`);
    return this.httpClient.get<any>(`${this.VISA_LIST_PAGINATION_URL}&page=1`);
  }


}
