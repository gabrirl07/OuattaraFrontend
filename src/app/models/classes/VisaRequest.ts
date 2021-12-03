import {IVisa, IVisaRequest} from '../interfaces/visa';
import {ClassUtils} from './ClassUtils';
import {Resellers} from './Resellers';
import {Visa} from './Visa';
import {Customer} from './Customer';
import {CUSTOMERS_LINK} from '../../utils/constants';
import {Agent} from '../interfaces/agent';
import {ICustomer} from '../interfaces/icustomer';

export class VisaRequest extends  ClassUtils {

    instance: IVisaRequest;
    reseller: Resellers | null = null;
    visa: Visa | null | undefined = null;
    customer: Customer | null = null;

    constructor(data: IVisaRequest, reseller?: Agent, visa?: Visa, costumer?: ICustomer) {
        super();

        this.instance = data;
        this.visa = visa;

        if (reseller) {
            this.reseller = new Resellers(reseller);
        }

        if (costumer) {
            this.customer = new Customer(costumer)
        }
    }

    get detailUrl() {
        return `${CUSTOMERS_LINK}/${this.instance?.id}`
    }

    get id() {
        return this.instance.id;
    }

    get picture(){
        return this.customer?.picture;
    }

    get born(){
        return  this.datePipe.transform(this.instance?.created_on, "dd-MM-yyyy à HH:mm:ss");
    }

    get lastStatus() {
        if (!this.instance.latest_status)
        {
            return null;
        }
        return {
            label: this.instance.latest_status?.status?.name,
            color: this.instance.latest_status?.status?.color_code,
        }
    }

    get customerProfile() {
        return this.customer?.profile
    }

    get customerAge() {
        return this.customer?.age
    }

    get customerIsOld() {
        return this.customer?.isOld;
    }

     get customerHasAge() {
        return this.customer?.hasAge;
    }

    get fullname() {
        return this.customer?.fullName;
    }

    get nationality() {
        return this.customer?.nationality;
    }

    get resellerProfile() {
        return this.reseller?.fullName;
    }

    get visaTypeDuration() {
        return this.instance.visa_type.name;
    }

    get expirationDate() {
        return this.visa?.expirationDate;
    }

    get deliveryDate() {
        return this.visa?.deliveryDate;
    }

    isExpired() {
        return this.visa?.isExpired();
    }

    get visaStatus() {
        return this.visa?.visaStatus;
    }

    get hasVisa() {
        return !!this.instance.visa;
    }


}