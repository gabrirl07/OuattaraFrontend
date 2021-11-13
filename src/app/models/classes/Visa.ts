import {IVisa} from '../interfaces/visa';
import {ClassUtils} from './ClassUtils';
import {VisaRequest} from './VisaRequest';

export class Visa extends  ClassUtils {

    instance: IVisa;
    visaRequest: VisaRequest;
    dateFormat: string = "EEEE d MMMM y";

    constructor(data: IVisa) {
        super();
        this.instance = data;
        this.visaRequest = new VisaRequest(data.visa_request);
    }

    get detailUrl() {
        return `/dashboard/visa-requests/${this.visaRequest.id}`
    }

    get expirationDate() {
        return this.instance?.expiry_date ? this.datePipe.transform(this.instance?.expiry_date, this.dateFormat) : '--';
    }

    get deliveryDate() {
        return this.instance?.delivery_date ? this.datePipe.transform(this.instance?.delivery_date, this.dateFormat) : '--';
    }

    isExpired() {
        return new Date(this.expirationDate as string) < new Date(new Date().toDateString());
    }

    get visaStatus() {
        return this.isExpired() ? 'EXPIRED' : 'IN USE';
    }

}