import {IVisaRequest} from '../interfaces/visa';
import {ClassUtils} from './ClassUtils';
import {Resellers} from './Resellers';
import {Visa} from './Visa';

export class VisaRequest extends  ClassUtils {

    instance: IVisaRequest;
    reseller: Resellers | null = null;
    visa: Visa | null = null;

    constructor(data: IVisaRequest) {
        super();
        this.instance = data;
        if (data.reseller) {
            this.reseller = new Resellers(data.reseller);
        }
        if (data.visa) {
            this.visa = new Visa(data.visa)
        }
    }

    get id() {
        return this.instance.id;
    }

    get picture(){
        return this.instance?.costumer?.picture?.file ?? 'assets/images/avatar.png';
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
        return this.instance.costumer?.firstname + " " + this.instance.costumer?.lastname + (this.instance.costumer?.birth_country ? (", " + this.instance.costumer?.birth_country) : '')
    }

    get customerAge() {
        return this.instance.costumer?.age <= 1
            ? ( this.instance.costumer?.age === 0 ? "moins d'un an" : '1 an')
            : `${this.instance.costumer?.age} ans`
    }

    get customerIsOld() {
        return this.instance.costumer?.age >= 18;
    }

     get customerHasAge() {
        return !!this.instance.costumer?.age;
    }

    get fullname() {
        return this.instance.costumer?.firstname + " " + this.instance.costumer?.lastname
    }

    get nationality() {
        return this.instance.costumer?.birth_country ?? 'N/A';
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
        if (this.hasVisa) {
            return this.visa?.expirationDate
        }
        return true;
    }

    get visaStatus() {
        return this.visa?.visaStatus;
    }

    get hasVisa() {
        return !!this.instance.visa;
    }


}