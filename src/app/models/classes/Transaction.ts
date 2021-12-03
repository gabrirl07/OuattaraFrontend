import {ClassUtils} from './ClassUtils';
import {Agent, Transactions} from '../interfaces/agent';
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
}