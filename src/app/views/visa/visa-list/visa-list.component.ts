import { Component, OnInit } from '@angular/core';
import {UtilsService} from '../../../services/utils/utils.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../../services/notification/notification.service';
import {VisaService} from '../../../services/visa/visa.service';
import {Paginations} from '../../../models/classes/Paginations';
import {Visa} from '../../../models/classes/Visa';
import {HttpPaginateResponse} from '../../../models/interfaces/global';
import {IVisa} from '../../../models/interfaces/visa';

@Component({
  selector: 'app-visa-list',
  templateUrl: './visa-list.component.html',
  styleUrls: ['./visa-list.component.scss']
})
export class VisaListComponent implements OnInit {

  visas!: Visa[] | null;
  dtOptions: DataTables.Settings = {};
  pagination!: Paginations | null;
  isLoadingSearchResult: boolean = false;

  constructor(private visaService: VisaService, public utilsService: UtilsService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.dtOptions = {
      searching: false,
      ordering: false,
      paging: false,
      info: false
    };

    this.visaService.requestVisa(this.buildRequestURL()).subscribe((result) => {
      this.seedTable(result);
    });
  }

  updatePagination(page: any) {
    this.updateTable(this.buildRequestURL(page))
  }

  showDetails(url: string) {
    this.router.navigate([url]);
  }

  updateTable(url : string) {
    this.visaService.requestVisa(url).subscribe((result) => {
      this.seedTable(result);
    }, () => {
      this.notificationService.error();
    })
  }

  seedTable(data: HttpPaginateResponse) {
    this.visas = data.items.map((visa: IVisa) => new Visa(visa, visa.visa_request));
    this.pagination = new Paginations(data._links);
  }


  buildRequestURL( page: number = 1, params: string = '',) {

    let url = `${this.visaService.VISA_LIST_PAGINATION_URL}&page=${page}`;

    if (params) {
      url = `${url}&${params}`
    }

    return url;
  }

}
