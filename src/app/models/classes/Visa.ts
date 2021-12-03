import {IVisa, IVisaRequest} from '../interfaces/visa';
import {ClassUtils} from './ClassUtils';
import {VisaRequest} from './VisaRequest';
import {DATE_FORMAT, VISA_REQUESTS_LINK} from '../../utils/constants';

export class Visa extends  ClassUtils {

    instance: IVisa;
    visaRequest: VisaRequest | null = null;
    dateFormat: string = DATE_FORMAT;

    constructor(data: IVisa, visa_request?: IVisaRequest) {
        super();
        this.instance = data;
        if (visa_request) {
            this.visaRequest = new VisaRequest(visa_request, visa_request?.reseller, this, visa_request?.costumer);
        }
    }

    get detailUrl() {
        return `${VISA_REQUESTS_LINK}/${this.visaRequest?.id}`
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