import { Injectable } from '@angular/core';
import {BaseService} from '../general/base.service';
import {HttpClient} from '@angular/common/http';
import {COMPANIES_LIST_URL} from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService extends  BaseService{

  public COMPANIES_LIST_PAGINATION_URL = `${COMPANIES_LIST_URL}?limit=${this.PAGINATION_STEP}`;

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

}
