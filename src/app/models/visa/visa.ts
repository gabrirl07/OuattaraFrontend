export interface Visa {
  id: string;
  created_on: string;
  costumer: any;
  reseller: any;
  status_updates: any;
  visa_type: any;
  latest_status: any;
}

export interface VisaList {
  items: Visa[],
  total_page: number,
  self: number,
  items_count: number,
  _links: {
    self: string,
    first: string,
    last: string,
  },
}
