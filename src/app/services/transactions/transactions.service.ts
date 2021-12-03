import { Injectable } from '@angular/core';
import {TRANSACTION_LIST_URL, TRANSACTION_URL} from '../../utils/constants';
import {BaseService} from '../general/base.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Transactions} from '../../models/interfaces/agent';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService extends BaseService {

  public TRANSACTIONS_LIST_PAGINATION_URL = `${TRANSACTION_LIST_URL}?limit=${this.PAGINATION_STEP}`;

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  getTransaction(transactionId: string): Observable<Transactions> {
    return this.httpClient.get<Transactions>(`${TRANSACTION_URL}/${transactionId}`);
  }

  approveTransaction(transactionId: string): Observable<Transactions> {
    return this.httpClient.post<Transactions>(`${TRANSACTION_URL}/${transactionId}/approve`, {});
  }

}
