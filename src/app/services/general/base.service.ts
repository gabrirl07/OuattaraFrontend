import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PAGE_LENGTH} from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  public PAGINATION_STEP = PAGE_LENGTH;

  constructor(protected httpClient: HttpClient) { }

  sendRequest(url: string) {
    return this.httpClient.get<any>(url);
  }

}
