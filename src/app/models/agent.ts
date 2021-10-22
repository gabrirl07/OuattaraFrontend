export interface Agent {
    id: string
    name: string,
    surname: string,
    code: string,
    account: {
        email: string,
    }
}

export interface Transactions {
    id: string
    amount: number,
    transaction_date: string,
    motive: string,
    type: TransactionType,
    status: TransactionStatus,
}


export enum TransactionType {
    PAYMENT = 'payment',
    DEPOSIT = 'deposit',
}


export enum TransactionStatus {
    APPROVED = 'approved',
    PENDING = 'pending',
}


