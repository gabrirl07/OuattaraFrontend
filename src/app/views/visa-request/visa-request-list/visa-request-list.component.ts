import { Component, OnInit } from '@angular/core';
import {VisaRequest} from '../../../models/classes/VisaRequest';
import {GlobalStats, HttpPaginateResponse} from '../../../models/interfaces/global';
import {Paginations} from '../../../models/classes/Paginations';
import {VisaService} from '../../../services/visa/visa.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../../services/notification/notification.service';
import {forkJoin} from 'rxjs';
import {VISA_REQUESTS_LINK, VISAS_LINK} from '../../../utils/constants';
import {IVisaRequest} from '../../../models/interfaces/visa';
import {Visa} from '../../../models/classes/Visa';

@Component({
  selector: 'app-visa-request-list',
  templateUrl: './visa-request-list.component.html',
  styleUrls: ['./visa-request-list.component.scss']
})
export class VisaRequestListComponent implements OnInit {

  visas!: VisaRequest[] | null;
  dtOptions: DataTables.Settings = {};
  stats!: GlobalStats;
  pagination!: Paginations | null;
  isLoadingSearchResult: boolean = false;
  search: string = '';
  isFiltering: boolean = false;
  filterParam = {
    date: false,
    name: false
  };
  dropdownList : any[] = [];
  selectedItems: any[] = [];
  dropdownSettings: any;

  constructor(private visaService: VisaService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.dtOptions = {
      searching: false,
      ordering: false,
      paging: false,
      info: false,
    };

    this.dropdownSettings = {
      singleSelection: false,
      text:"Select status",
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      enableSearchFilter: true,
    };

    let request = [];
    request.push(this.visaService.getDashboardStats());
    request.push(this.visaService.requestVisa(this.buildRequestURL()));
    request.push(this.visaService.getVisaStatus());
    forkJoin([...request]).subscribe((result) => {
      this.stats = result[0];
      this.seedTable(result[1]);
      this.dropdownList = result[2].items.map((status: any) => {
        return {
          id: status.id,
          itemName: status.name
        }
      });
    });

  }

  get pendingRequest() {
    return this.stats?.pending_visarequests ? this.stats?.pending_visarequests : 0;
  }

  showPendingRequest() {
    let status = this.dropdownList.find((state) => state.itemName == 'NEW');
    this.clearFilter();
    this.selectedItems.push(status);
    this.updatePagination(1);
  }

  goToVisas() {
    this.router.navigate([`${VISAS_LINK}`]);
  }

  showDetails(visaId: string) {
    this.router.navigate([`${VISA_REQUESTS_LINK}/${visaId}`]);
  }

  updatePagination(page: any) {
    this.updateTable(this.buildRequestURL('', page))
  }

  updateTable(url : string) {
    this.visaService.requestVisa(url).subscribe((result) => {
      this.seedTable(result);
    }, () => {
      this.notificationService.error();
      this.isLoadingSearchResult = false;
    })
  }

  seedTable(data: HttpPaginateResponse) {
    this.visas = data.items.map((visa: IVisaRequest) => new VisaRequest(visa, visa?.reseller, new Visa(visa.visa, visa), visa?.costumer));
    this.pagination = new Paginations(data._links);
    this.isLoadingSearchResult = false;
  }

  clearFilter() {
    this.selectedItems = [];
    this.filterParam.date = false;
    this.filterParam.name = false;
  }

  buildRequestURL(params: string = '', page: number = 1) {

    let url = `${this.visaService.VISA_REQUEST_LIST_PAGINATION_URL}&page=${page}`;

    if (this.search) {
      url = `${url}&filter=${this.search}`
    }

    if (this.filterParam.name) {
      url = `${url}&order_by_name=${1}`;
    }

    if (this.filterParam.date) {
      url = `${url}&order_by_date=${1}`
    }

    if (params) {
      url = `${url}&${params}`
    }


    if (this.selectedItems.length > 0) {
      this.selectedItems.forEach((status: any) => {
        url = `${url}&statuses=${status.id}`
      });
    }

    this.isLoadingSearchResult = true;

    return url;
  }

}
