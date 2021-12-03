import {ClassUtils} from './ClassUtils';
import {Agent, Transactions, TransactionType} from '../interfaces/agent';
import {Resellers} from './Resellers';
import {DATE_FORMAT} from '../../utils/constants';

export class Transaction extends  ClassUtils {

    instance: Transactions;
    reseller: Resellers | null = null;
    private dateFormat: string = DATE_FORMAT;

    constructor(data: Transactions, reseller?:Agent) {
        super();
        this.instance = data;
        if (reseller) {
            this.reseller = new Resellers(reseller);
        }
    }

    get id() {
        return this.instance.id;
    }

    get reason() {
        return this.instance.motive;
    }

    get amount() {
        return this.instance.amount;
    }

    get date() {
        return this.datePipe.transform(this.instance?.transaction_date, this.dateFormat);
    }

    get label() {
        if (this.instance.type) {
            switch (this.instance.type) {
                case TransactionType.PAYMENT:
                    return 'Visa Payment';
                case TransactionType.DEPOSIT:
                    return 'Deposit';
            }
        }
        return '--';
    }

    get isDepositTransaction() {
        return this.instance.type === TransactionType.DEPOSIT
    }

    get isWithdrawTransaction() {
        return this.instance.type === TransactionType.PAYMENT
    }

    get isApproved() {
        return Boolean(this.instance?.is_approved)
    }

    get status() {
        return 'N/A'
    }

    get approvedBy() {
        return this.instance?.approved_by?.email || 'N/A';
    }

    get approvedDate() {
        return this.instance?.approved_on  ? this.datePipe.transform(this.instance?.approved_on, this.dateFormat) : 'N/A';
    }

}