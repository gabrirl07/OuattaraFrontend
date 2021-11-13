import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CUSTOMER_LIST_URL} from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  public PAGINATION_STEP = 10;
  public CUSTOMER_LIST_PAGINATION_URL = `${CUSTOMER_LIST_URL}?limit=${this.PAGINATION_STEP}`;


  constructor(
      private httpClient: HttpClient
  ) { }


  requestVisa(url: string) {
    return this.httpClient.get<any>(url);
  }
}
