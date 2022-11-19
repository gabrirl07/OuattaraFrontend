import { environment } from "src/environments/environment";

// Key
export const TOKEN_KEY = "authKey";
export const PROFILE_KEY = "userKey";
export const PAGE_LENGTH = 10;
export const DATE_FORMAT = "EEEE d MMMM y";

// Endpoint
export const BASE_URL = `${environment.BASE_API_URL}/v1`;
export const LOGIN_URL = `${environment.BASE_AUTH_API_URL}/oauth/v2/token`;
export const VISA_LIST_URL = `${environment.BASE_API_URL}/v1/visas`;
export const CUSTOMER_LIST_URL = `${environment.BASE_API_URL}/v1/costumers`;
export const COMPANIES_LIST_URL = `${environment.BASE_API_URL}/v1/agencies`;
export const TRANSACTION_LIST_URL = `${environment.BASE_API_URL}/v1/transactions`;
export const VISA_REQUEST_LIST_URL = `${environment.BASE_API_URL}/v1/visarequests`;
export const AGENT_LIST_URL = `${environment.BASE_API_URL}/v1/resellers`;
export const TRANSACTION_URL = `${environment.BASE_API_URL}/v1/transactions`;
export const STATUS_URL = `${environment.BASE_API_URL}/v1/visastatus`;

// Internal Links

export const HOME_LINK = `/dashboard/visa-requests`;
export const VISA_REQUESTS_LINK = `/visa-requests`;
export const RESELLERS_LINK = `/company/resellers`;
export const COMPANIES_LINK = `/company`;
export const CUSTOMERS_LINK = `/costumers`;
export const TRANSACTIONS_LINK = `/transactions`;
export const VISAS_LINK = `/visas`;


// Enum 

export enum VISA_STATUS {
    VISASTATUS_NEW = 1,
    VISASTATUS_PENDING = 2,
    VISASTATUS_ACCEPTED = 3,
    VISASTATUS_ACTIF = 4,
    VISASTATUS_EXPIRED = 5,
    VISASTATUS_REJECTED = 6
}

