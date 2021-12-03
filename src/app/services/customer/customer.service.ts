import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CUSTOMER_LIST_URL} from '../../utils/constants';
import {BaseService} from '../general/base.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService {

  public CUSTOMER_LIST_PAGINATION_URL = `${CUSTOMER_LIST_URL}?limit=${this.PAGINATION_STEP}`;

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }



}
