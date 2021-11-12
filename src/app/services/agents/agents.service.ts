import { Injectable } from '@angular/core';
import {AGENT_LIST_URL, TRANSACTION_URL} from '../../utils/constants';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Transactions} from '../../models/interfaces/agent';
import {HttpPaginateResponse} from '../../models/interfaces/global';

@Injectable({
  providedIn: 'root'
})
export class AgentsService {


  public AGENT_LIST_PAGINATION_STEP = 10;
  private AGENT_LIST_PAGINATION_URL = `${AGENT_LIST_URL}?limit=${this.AGENT_LIST_PAGINATION_STEP}`;

  constructor(
      private httpClient: HttpClient
  ) { }

  getAllAgents(page: any = 1): Observable<any> {
    return this.httpClient.get<any>(`${this.AGENT_LIST_PAGINATION_URL}&page=${page}`);
  }

  getOneAgents(agentId: string): Observable<any> {
    return this.httpClient.get<any>(`${AGENT_LIST_URL}/${agentId}`);
  }

  getAgentTransactions(agentId: string): Observable<HttpPaginateResponse> {
    return this.httpClient.get<HttpPaginateResponse>(`${AGENT_LIST_URL}/${agentId}/transactions`);
  }

  getTransactionDocuments(transactionId: string): Observable<HttpPaginateResponse> {
    return this.httpClient.get<HttpPaginateResponse>(`${TRANSACTION_URL}/${transactionId}/documents`);
  }

  filterList(search: any, page: any = 1) {
    if (search.query) return this.httpClient.get<any>(`${this.AGENT_LIST_PAGINATION_URL}&page=${page}&query=${search.query}`);
    return this.httpClient.get<any>(`${this.AGENT_LIST_PAGINATION_URL}&page=1`);
  }

}
