import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {VisaService} from "../../services/visa/visa.service";
import {Visa} from "../../models/visa/visa";
import {NotificationService} from '../../services/notification/notification.service';
import {VISA_STATUS} from '../../utils/constants';


@Component({
  selector: 'app-visa-details',
  templateUrl: './visa-details.component.html',
  styleUrls: ['./visa-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VisaDetailsComponent implements OnInit {

  visa!: Visa;
  notFound: boolean = false;
  documents: any[] = [];
  isLoadingDocuments: boolean = true;
  reviewed: boolean = false;
  comment!: string;
  isUpdatingStatus: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private visaService: VisaService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.reload(param.id);
    })
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
    this.visaService.updateStatus(this.visa.id, {
      status: {
        id: this.reviewed ? VISA_STATUS.VISASTATUS_ACCEPTED : VISA_STATUS.VISASTATUS_REJECTED
      },
      comment: this.comment
    }).subscribe(() => {
      this.notificationService.success('Visa Status update with success !');
      $('#updateStatusCloser').trigger('click');
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
      this.visa = data
    }, () =>{
      this.notFound = true;
    });

    this.visaService.getVisaDocuments(visaId).subscribe((data) => {
      this.documents = data.items;
      this.isLoadingDocuments = false;
    });

  }
}
