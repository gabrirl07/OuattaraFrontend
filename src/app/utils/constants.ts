import { environment } from "src/environments/environment";

// Key
export const TOKEN_KEY = "authKey";
export const PROFILE_KEY = "userKey";

// Endpoint
export const BASE_URL = `${environment.BASE_API_URL}/v1`;
export const LOGIN_URL = `${environment.BASE_URL}/oauth/v2/token`;
export const VISA_LIST_URL = `${environment.BASE_API_URL}/v1/visarequests`;

// Enum 

export enum VISA_STATUS {
    VISASTATUS_NEW = 1,
    VISASTATUS_PENDING = 2,
    VISASTATUS_ACCEPTED = 3,
    VISASTATUS_ACTIF = 4,
    VISASTATUS_EXPIRED = 5,
    VISASTATUS_REJECTED = 6
}

