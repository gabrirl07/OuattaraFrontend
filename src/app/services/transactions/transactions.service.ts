import { Injectable } from '@angular/core';
import {PAGE_LENGTH, TRANSACTION_LIST_URL} from '../../utils/constants';
import {BaseService} from '../general/base.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService extends BaseService {

  public TRANSACTIONS_LIST_PAGINATION_URL = `${TRANSACTION_LIST_URL}?limit=${this.PAGINATION_STEP}`;

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }
}
