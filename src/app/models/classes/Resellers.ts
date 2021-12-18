import {Agent} from '../interfaces/agent';
import {ClassUtils} from './ClassUtils';

export class Resellers extends ClassUtils {

    instance: Agent;

    constructor(data: Agent) {
        super();
        this.instance = data;
    }

    get id() {
        return this.instance.id
    }

    get fullName() {
        return this.instance.firstname + ' ' + this.instance.lastname;
    }

    get code() {
        return this.instance?.code || 'N/A'
    }

    get email() {
        return this.instance?.account?.email || 'N/A'
    }

    get requestCount() {
        return this.instance?.total_visarequest || 0;
    }

    get customerCount() {
        return this.instance?.total_customer || 0;
    }

    get transactionCount() {
        return this.instance?.total_transaction || 0;
    }

    get balance() {
        return this.instance?.total_balance || 0;
    }

}