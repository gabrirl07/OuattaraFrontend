import {Pagination} from '../global';

export interface Visa {
  id: string;
  created_on: string;
  costumer: any;
  reseller: any;
  status_updates: any;
  visa_type: any;
  latest_status: any;
}

export interface VisaList extends Pagination{
  items: Visa[]
}
