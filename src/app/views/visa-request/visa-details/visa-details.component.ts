import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {VisaService} from "../../../services/visa/visa.service";
import {IVisaRequest} from "../../../models/interfaces/visa";
import {NotificationService} from '../../../services/notification/notification.service';
import {VISA_STATUS} from '../../../utils/constants';
import {DatePipe} from '@angular/common';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UtilsService} from '../../../services/utils/utils.service';


@Component({
  selector: 'app-visa-details',
  templateUrl: './visa-details.component.html',
  styleUrls: ['./visa-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VisaDetailsComponent implements OnInit {

  visa!: IVisaRequest;
  notFound: boolean = false;
  documents: any[] = [];
  isLoadingDocuments: boolean = true;
  reviewed: boolean = false;
  comment!: string;
  isUpdatingStatus: boolean = false;
  isLoading: boolean = true;
  isApproving: boolean = false;
  approveVisaForm!: FormGroup;
  invalidDate: string = new Date().toLocaleString();

  constructor(
    private route: ActivatedRoute,
    public  utilsService: UtilsService,
    private visaService: VisaService,
    private notificationService: NotificationService,
    private dateFormatter: DatePipe,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.reload(param.id);
    });

    this.approveVisaForm = this.fb.group({
      visaNumber: [null, Validators.required ],
      deliveryDate: [null, Validators.required],
    });

  }

  get visaNumber() {
    return this.approveVisaForm.get('visaNumber') ;
  }

  get deliveryDate() {
    return this.approveVisaForm.get('deliveryDate') ;
  }

  get now() {
    return new Date().toISOString().split("T")[0];
  }


  getProfilName(){
    let firstname = this.visa?.costumer?.firstname ?? '';
    let lastname = this.visa?.costumer?.lastname ?? '';
    return firstname + ' ' + lastname;
  }

  getProfilPicture(){
    return this.visa?.costumer?.picture?.file ?? 'assets/images/avatar.png';
  }

  preventNull(value: any = null){
    return value ? value : 'N/A';
  }

  updateStatus() {
    this.isUpdatingStatus = true;
    let request: Observable<any>;
    if (this.reviewed) {
      if (this.approveVisaForm.invalid) {
        this.approveVisaForm.markAllAsTouched();
        this.approveVisaForm.updateValueAndValidity();
        return;
      }
      request = this.visaService.approveVisaRequest(this.visa.id, {
        visa_number: this.visaNumber?.value,
        delivery_date: this.dateFormatter.transform(this.deliveryDate?.value, 'YYYY-MM-dd hh:mm:ss')
      });
    }
    else {
      request =  this.visaService.updateStatus(this.visa.id, {
        status: {id: VISA_STATUS.VISASTATUS_REJECTED},
        comment: this.comment
      });
    }

    request.subscribe(() => {
      this.notificationService.success(this.reviewed ? 'Visa request approved with success !' : 'Visa Status update with success !');
      $('#updateStatusCloser').trigger('click');
      $('#approveModalCloser').trigger('click');
      this.comment = '';
      this.isUpdatingStatus = false;
      this.reload(this.visa.id);
    }, () => {
      this.notificationService.error();
      this.comment = '';
      this.isUpdatingStatus = false;
    });
  }

  reload(visaId: any) {
    this.visaService.getVisa(visaId).subscribe((data) => {
      this.visa = data;
      this.isLoading = false;
    }, () =>{
      this.notFound = true;
    });

    this.visaService.getVisaDocuments(visaId).subscribe((data) => {
      this.documents = data.items;
      this.isLoadingDocuments = false;
    });
  }

  getVisaExpirationDate() {
    return this.visa.visa?.expiry_date ? this.dateFormatter.transform(this.visa.visa?.expiry_date, "EEEE MMMM d y") : '--';
  }

  getVisaDeliveryDate() {
    return this.visa.visa?.delivery_date ? this.dateFormatter.transform(this.visa.visa?.delivery_date, "EEEE MMMM d y") : '--';
  }

  visaIsExpired() {
    if (this.visa.visa) {
      return new Date(this.getVisaExpirationDate() as string) < new Date(new Date().toDateString())
    }
    return true;
  }
}
