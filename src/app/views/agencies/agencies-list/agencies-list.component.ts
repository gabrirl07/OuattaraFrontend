import { Component, OnInit } from '@angular/core';
import {Paginations} from '../../../models/classes/Paginations';
import {UtilsService} from '../../../services/utils/utils.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../../services/notification/notification.service';
import {HttpPaginateResponse} from '../../../models/interfaces/global';
import {CompaniesService} from '../../../services/companies/companies.service';
import {Companie} from '../../../models/classes/Companie';
import {Companies} from '../../../models/interfaces/companies';

@Component({
  selector: 'app-agencies-list',
  templateUrl: './agencies-list.component.html',
  styleUrls: ['./agencies-list.component.scss']
})
export class AgenciesListComponent implements OnInit {

  companies!: Companie[] | null;
  dtOptions: DataTables.Settings = {};
  stats: any;
  pagination!: Paginations | null;
  isLoadingSearchResult: boolean = false;
  search: string = '';
  company: string = '';
  isSearching: boolean = false;

  constructor(private companiesService: CompaniesService, public utilsService: UtilsService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.dtOptions = {
      searching: false,
      ordering: false,
      paging: false,
      info: false
    };

    this.companiesService.sendRequest(this.buildRequestURL()).subscribe((result) => {
      this.seedTable(result);
    }, (response) => {
      this.notificationService.displayHttpError(response);
      this.isLoadingSearchResult = false;
    });
  }

  showDetails(companieID: string) {
    this.router.navigate([`/company/${companieID}`]);
  }

  updatePagination(page: any) {
    this.companiesService.sendRequest(this.buildRequestURL('', page)).subscribe((result) => {
      this.seedTable(result);
    }, (response) => {
      this.notificationService.displayHttpError(response);
      this.isLoadingSearchResult = false;
    })
  }

  updateTable(url : string) {
    this.companiesService.sendRequest(url).subscribe((result) => {
      this.seedTable(result);
    }, (response) => {
      this.notificationService.displayHttpError(response);
      this.isLoadingSearchResult = false;
    })
  }


  seedTable(data: HttpPaginateResponse) {
    this.companies = data.items.map((item: Companies) => new Companie(item));
    this.pagination = new Paginations(data._links);
    this.isLoadingSearchResult = false;
  }

  buildRequestURL(params: string = '', page: number = 1) {

    let url = `${this.companiesService.COMPANIES_LIST_PAGINATION_URL}&page=${page}`;

    if (this.search) {
      url = `${url}&filter=${this.search}`
    }

    this.isLoadingSearchResult = true;

    return url;
  }

}
