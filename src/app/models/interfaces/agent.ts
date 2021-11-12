export interface Agent {
    id: string
    firstname: string,
    lastname: string,
    code: string,
    account: {
        email: string,
    },
    total_visarequest: number,
    total_customer: number,
    total_transaction: number,
    total_balance: number,
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


