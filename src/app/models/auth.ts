

export interface LoginPayload {
  client_id: string,
  client_secret: string,
  grant_type: string,
  email: string;
  password: string;
}

export interface User {
  id: number;
  surname: string;
  firstname: string;
  username: string;
  email: string;
  token?: string;
  email_verified_at: Date;
  phone_number: string;
  phone_number_verified_at: string;
  is_first_login: number;
  created_at: Date;
  updated_at: Date;
}

export interface LoginErrors {
  email?: string[];
  password?: string[];
}

export interface UserToken {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope: string | null;
}
