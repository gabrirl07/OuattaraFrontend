import {Pagination} from './global';
import {Agent} from './agent';
import {VisaRequest} from '../classes/VisaRequest';
import {Visa} from '../classes/Visa';

export interface IVisaRequest {
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
  visa?: IVisa
}

export interface IVisa {
  visa_number: string,
  delivery_date: string,
  expiry_date: string,
  visa_request: IVisaRequest,
}

export interface VisaList extends Pagination{
  items: IVisaRequest[]
}
