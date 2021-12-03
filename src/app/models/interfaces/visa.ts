import {HttpPaginateResponse} from './global';
import {Agent} from './agent';
import {ICustomer} from './icustomer';

export interface IVisaRequest {
  id: string;
  created_on: string;
  costumer: ICustomer;
  reseller: Agent;
  status_updates: any;
  visa_type: IVisaType;
  latest_status: any;
  visa: IVisa
}

export interface IVisa {
  visa_number: string,
  delivery_date: string,
  expiry_date: string,
  visa_request: IVisaRequest,
}

export interface IVisaType {
  id: string,
  name: string,
  period: number
}

export interface IVisaList extends HttpPaginateResponse{
  items: IVisaRequest[]
}

