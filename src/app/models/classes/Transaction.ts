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

    get isDepositTransactionLabel() {
        return 'Deposit'
    }

    get isWithdrawTransaction() {
        return this.instance.type === TransactionType.PAYMENT
    }

    get isWithdrawTransactionLabel() {
        return 'Withdrawal'
    }

    get isApproved() {
        return this.instance?.is_approved === true
    }

    get isPending() {
        return this.instance?.is_approved === null || this.instance?.is_approved === undefined
    }

    get isCanceled() {
        return this.instance?.is_approved === false
    }

    get status() {

        if (this.isWithdrawTransaction) {
            return '';
        }

        if (this.isApproved) {
            return 'Approved';
        }
        if (this.isPending) {
            return 'Pending';
        }
        if (this.isCanceled) {
            return 'Canceled';
        }
        return 'N/A'
    }

    get approvedBy() {
        return this.instance?.reviewed_by?.email || 'N/A';
    }

    get approvedDate() {
        return this.instance?.reviewed_on  ? this.datePipe.transform(this.instance?.reviewed_on, this.dateFormat) : 'N/A';
    }

}