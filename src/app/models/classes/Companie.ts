import {ClassUtils} from './ClassUtils';
import {Companies} from '../interfaces/companies';

export class Companie extends  ClassUtils {

    instance: Companies;

    constructor(data: Companies) {
        super();
        this.instance = data;
    }

    get id() {
        return this.instance.id;
    }

    get name() {
        return this.instance.name || 'N/A';
    }
    get email() {
        return this.instance.email || 'N/A';
    }

    get website() {
        return this.instance.website || 'N/A';
    }

    get phoneNumer() {
        return this.instance.phone_number || 'N/A';
    }

    get picture(){
        return this.instance?.logo?.file ?? 'assets/images/avatar.png';
    }

}