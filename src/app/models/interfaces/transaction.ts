import {Agent} from './agent';

export interface ITransaction {
    id: string,
    amount: string,
    motive: string,
    transaction_date: string,
    type: string,
    user: {
        id: string,
        email: string,
        reseller: Agent,
        roles: string[]
    }
}
