import {ServerFile} from './global';

export interface Companies {
    id: string,
    name: string,
    phone_number: string,
    email: string,
    website: string,
    logo: ServerFile
}
