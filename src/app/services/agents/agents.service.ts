import { Injectable } from '@angular/core';
import {AGENT_LIST_URL, TRANSACTION_URL} from '../../utils/constants';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpPaginateResponse} from '../../models/interfaces/global';

@Injectable({
  providedIn: 'root'
})
export class AgentsService {


  public AGENT_LIST_PAGINATION_STEP = 10;
  public AGENT_LIST_PAGINATION_URL = `${AGENT_LIST_URL}?limit=${this.AGENT_LIST_PAGINATION_STEP}`;

  constructor(
      private httpClient: HttpClient
  ) { }

  getOneAgents(agentId: string): Observable<any> {
    return this.httpClient.get<any>(`${AGENT_LIST_URL}/${agentId}`);
  }

  getAgentTransactions(agentId: string): Observable<HttpPaginateResponse> {
    return this.httpClient.get<HttpPaginateResponse>(`${AGENT_LIST_URL}/${agentId}/transactions`);
  }

  getTransactionDocuments(transactionId: string): Observable<HttpPaginateResponse> {
    return this.httpClient.get<HttpPaginateResponse>(`${TRANSACTION_URL}/${transactionId}/documents`);
  }

  requestResellers(url: string) {
    return this.httpClient.get<any>(url);
  }
}
