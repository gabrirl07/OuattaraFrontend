import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_URL, STATUS_URL, VISA_LIST_URL, VISA_REQUEST_LIST_URL} from '../../utils/constants';
import {IVisaRequest} from "../../models/interfaces/visa";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VisaService {

  public VISA_LIST_PAGINATION_STEP = 10;
  public VISA_REQUEST_LIST_PAGINATION_URL = `${VISA_REQUEST_LIST_URL}?limit=${this.VISA_LIST_PAGINATION_STEP}`;
  public VISA_LIST_PAGINATION_URL = `${VISA_LIST_URL}?limit=${this.VISA_LIST_PAGINATION_STEP}`;


  constructor(
    private httpClient: HttpClient
  ) { }

  getVisa(visaId: string): Observable<IVisaRequest> {
    return this.httpClient.get<IVisaRequest>(`${VISA_REQUEST_LIST_URL}/${visaId}`);
  }

  getDashboardStats(): Observable<any> {
    return this.httpClient.get<any>(`${BASE_URL}/stats`);
  }

  getVisaDocuments(visaId: string): Observable<any> {
    return this.httpClient.get<any>(`${VISA_REQUEST_LIST_URL}/${visaId}/passport/documents`);
  }

  updateStatus(visaId: string, status: any): Observable<any> {
    return this.httpClient.post<any>(`${VISA_REQUEST_LIST_URL}/${visaId}/status/update`, status);
  }

  requestVisa(url: string) {
    return this.httpClient.get<any>(url);
  }

  approveVisaRequest(visaId: string, details: any) {
    return this.httpClient.post<any>(`${VISA_REQUEST_LIST_URL}/${visaId}/approve`, details);
  }

  getVisaStatus() {
    return this.httpClient.get<any>(`${STATUS_URL}/?limit=10`);
  }


}
