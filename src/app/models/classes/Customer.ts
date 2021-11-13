import {ClassUtils} from './ClassUtils';
import {ICustomer} from '../interfaces/icustomer';

export class Customer extends  ClassUtils {

    instance: ICustomer;

    constructor(data: ICustomer) {
        super();
        this.instance = data;
    }

    get id() {
        return this.instance.id;
    }

    get picture(){
        return this.instance?.picture?.file ?? 'assets/images/avatar.png';
    }

    get profile() {
        return this.instance?.firstname + " " + this.instance?.lastname + (this.instance?.birth_country ? (", " + this.instance?.birth_country) : '')
    }

    get age() {
        return this.instance?.age <= 1
            ? ( this.instance?.age === 0 ? "moins d'un an" : '1 an')
            : `${this.instance?.age} ans`
    }

    get isOld() {
        return this.instance?.age >= 18;
    }

     get hasAge() {
        return !!this.instance?.age;
    }

    get fullName() {
        return this.instance?.firstname + " " + this.instance?.lastname
    }

    get nationality() {
        return this.instance?.present_nationality ?? 'N/A';
    }

    get firstName() {
        return this.instance?.firstname;
    }
    get lastName() {
        return this.instance?.lastname;
    }

}