import {Visa} from '../interfaces/visa';
import {DatePipe} from '@angular/common';

export class VisaRequest {

    instance: Visa;
    private datePipe: DatePipe = new DatePipe('fr');

    constructor(data: Visa) {
        this.instance = data;
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

    get fullname() {
        return this.instance.costumer?.firstname + " " + this.instance.costumer?.lastname
    }


    get resellerProfile() {
        return this.instance.reseller?.account?.email + " " + (this.instance.reseller?.agency?.name ? (' / ' + this.instance.reseller?.agency?.name) : '');
    }


    get visaTypeDuration() {
        return this.instance.visa_type.name;
    }

    get expirationDate() {
        return this.instance.visa?.expiry_date ? this.datePipe.transform(this.instance.visa?.expiry_date, "EEEE MMMM d y") : '--';
    }

    get deliveryDate() {
        return this.instance.visa?.delivery_date ? this.datePipe.transform(this.instance.visa?.delivery_date, "EEEE MMMM d y") : '--';
    }

    isExpired() {
        if (this.hasVisa) {
            return new Date(this.expirationDate as string) < new Date(new Date().toDateString())
        }
        return true;
    }

    get visaStatus() {
        return this.isExpired() ? 'EXPIRED' : 'IN USED';
    }

    get hasVisa() {
        return !!this.instance.visa;
    }


}