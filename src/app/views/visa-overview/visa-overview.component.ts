import { Component, OnInit } from '@angular/core';
import {VisaService} from "../../services/visa/visa.service";
import { Router} from "@angular/router";
import {forkJoin} from "rxjs";
import {HttpPaginateResponse, Pagination} from '../../models/interfaces/global';
import {NotificationService} from '../../services/notification/notification.service';
import {VisaRequest} from '../../models/classes/VisaRequest';
import {Paginations} from '../../models/classes/Paginations';

@Component({
  selector: 'app-visa-overview',
  templateUrl: './visa-overview.component.html',
  styleUrls: ['./visa-overview.component.scss']
})
export class VisaOverviewComponent implements OnInit {
  visas!: VisaRequest[] | null;
  dtOptions: DataTables.Settings = {};
  stats: any;
  pagination!: Paginations | null;
  isLoadingSearchResult: boolean = false;
  search: string = '';
  isSearching: boolean = false;
  filterParam = {
    date: false,
    name: false
  };
  dropdownList : any[] = [];
  selectedItems = [];
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
    request.push(this.visaService.requestVisa(this.buildRequest()));
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

  showDetails(visaId: string) {
    this.router.navigate([`/dashboard/visas/${visaId}`]);
  }

  updatePagination(page: any) {
      this.updateTable(this.buildRequest('', page))
  }

  createRange(number: number){
    return new Array(number);
  }

  updateTable(url : string) {
    this.visas = null;
    this.pagination = null;
    this.visaService.requestVisa(url).subscribe((result) => {
      this.seedTable(result);
    }, () => {
      this.notificationService.error();
      this.isSearching = false;
      this.isLoadingSearchResult = false;
    })
  }

  seedTable(data: HttpPaginateResponse) {
    this.visas = data.items.map((visa: any) => new VisaRequest(visa));
    this.pagination = new Paginations(data._links);
    this.isLoadingSearchResult = false;
  }

  clearFilter() {
    this.selectedItems = [];
    this.filterParam.date = false;
    this.filterParam.name = false;
  }

  buildRequest(params: string = '', page: number = 1) {

    let url = `${this.visaService.VISA_LIST_PAGINATION_URL}&page=${page}`;

    if (this.search) {
      this.isSearching = true;
      this.isLoadingSearchResult = true;
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

    return url;
  }
}
