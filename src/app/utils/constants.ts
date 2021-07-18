import { environment } from "src/environments/environment";

// Key
export const TOKEN_KEY = "authKey";
export const PROFILE_KEY = "userKey";

// Endpoint
export const LOGIN_URL = `${environment.BASE_URL}/oauth/v2/token`;
export const VISA_LIST_URL = `${environment.BASE_URL}/api/v1/visarequests`;
