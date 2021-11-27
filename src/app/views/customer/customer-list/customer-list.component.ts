import { Component, OnInit } from '@angular/core';
import {Paginations} from '../../../models/classes/Paginations';
import {Customer} from '../../../models/classes/Customer';
import {HttpPaginateResponse} from '../../../models/interfaces/global';
import {UtilsService} from '../../../services/utils/utils.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../../services/notification/notification.service';
import {CustomerService} from '../../../services/customer/customer.service';

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

  constructor( private customerService: CustomerService, public utilsService: UtilsService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.dtOptions = {
      searching: false,
      ordering: false,
      paging: false,
      info: false
    };

    this.customerService.requestVisa(this.buildRequestURL()).subscribe((result) => {
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
    this.isLoadingSearchResult = true;
    this.customerService.requestVisa(url).subscribe((result) => {
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


  buildRequestURL( page: number = 1, params: string = '',) {

    let url = `${this.customerService.CUSTOMER_LIST_PAGINATION_URL}&page=${page}`;

    if (params) {
      url = `${url}&${params}`
    }

    return url;
  }

}
