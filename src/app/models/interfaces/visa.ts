import {Pagination} from './global';
import {Agent} from './agent';

export interface Visa {
  id: string;
  created_on: string;
  costumer: any;
  reseller: Agent;
  status_updates: any;
  visa_type: {
    id: string,
    name: string,
    period: number
  };
  latest_status: any;
  visa?: {
    visa_number: string,
    delivery_date: string,
    expiry_date: string,
  }
}

export interface VisaList extends Pagination{
  items: Visa[]
}
