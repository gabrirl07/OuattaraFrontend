import { Component, OnInit } from '@angular/core';
import {Paginations} from '../../../models/classes/Paginations';
import {Customer} from '../../../models/classes/Customer';
import {HttpPaginateResponse} from '../../../models/interfaces/global';
import {UtilsService} from '../../../services/utils/utils.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../../services/notification/notification.service';
import {CustomerService} from '../../../services/customer/customer.service';
import * as Countries from '../../../../assets/json/en-countries.json';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  customers!: Customer[] | null;
  dtOptions: DataTables.Settings = {};
  pagination!: Paginations | null;
  isLoadingSearchResult: boolean = false;
  isFiltering: boolean = false;
  isMakingFilterRequest: boolean = false;
  search: string = '';
  age: number = 0;
  dropdownList : any[] = [];
  selectedItems: any[] = [];
  dropdownSettings: any;


  constructor( private customerService: CustomerService, public utilsService: UtilsService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {

    this.dtOptions = {
      searching: false,
      ordering: false,
      paging: false,
      info: false
    };


    this.dropdownSettings = {
      singleSelection: false,
      text:"Select countries",
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      enableSearchFilter: true,
    };


    this.customerService.sendRequest(this.buildRequestURL()).subscribe((result) => {
      this.seedTable(result);
      this.dropdownList = this.formatCountryListInTable();
    });
  }

  updatePagination(page: any) {
    this.updateTable(this.buildRequestURL(page))
  }

  showDetails(url: string) {
    this.router.navigate([url]);
  }

  updateTable(url : string) {
    this.isLoadingSearchResult = true;
    this.customerService.sendRequest(url).subscribe((result) => {
      this.seedTable(result);
    }, () => {
      this.notificationService.error();
    })
  }

  seedTable(data: HttpPaginateResponse) {
    this.customers = data.items.map((customer: any) => new Customer(customer));
    this.pagination = new Paginations(data._links);
    this.isLoadingSearchResult = false;
  }


  clearFilter() {
    this.selectedItems = [];
    this.age = 0;
    this.search = '';
    this.isMakingFilterRequest = false;
  }



  buildRequestURL( page: number = 1, params: string = '',) {

    let url = `${this.customerService.CUSTOMER_LIST_PAGINATION_URL}&page=${page}`;
    this.isMakingFilterRequest = false;

    if (this.search) {
      this.isMakingFilterRequest = true;
      url = `${url}&filter=${this.search}`
    }

    if (this.age) {
      this.isMakingFilterRequest = true;
      url = `${url}&less_than=${this.search}`
    }

    if (params) {
      this.isMakingFilterRequest = true;
      url = `${url}&${params}`
    }

    if (this.selectedItems.length > 0) {
      this.isMakingFilterRequest = true;
      this.selectedItems.forEach((status: any) => {
        url = `${url}&countries=${status.id.toLowerCase()}`
      });
    }

    return url;
  }

  formatCountryListInTable() {
    let countries = [];
    for (const [key, value] of Object.entries((Countries as any).countries)) {
      countries.push({
        id: key,
        itemName: value
      })
    }
     return countries;
  }

}
