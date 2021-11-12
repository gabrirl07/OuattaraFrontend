import { Component, OnInit } from '@angular/core';
import {Visa, VisaList} from '../../models/interfaces/visa';
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

  constructor(private visaService: VisaService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.dtOptions = {
      searching: false,
      ordering: false,
      paging: false,
      info: false,
    };

    let request = [];
    request.push(this.visaService.getDashboardStats());
    request.push(this.visaService.getVisaList());
    forkJoin([...request]).subscribe((result) => {
      this.stats = result[0];
      this.seedTable(result[1]);
    });

  }

  showDetails(visaId: string) {
    this.router.navigate([`/dashboard/visas/${visaId}`]);
  }

  preventNull(value: any){
    return value ? value : '--';
  }


  getProfilPicture(visa: any){
    return visa?.costumer?.picture?.file ?? 'assets/images/avatar.png';
  }

  updatePagination(page: any) {
      this.visas = null;
      this.pagination = null;
      let request = this.isSearching
          ? this.visaService.filterVisaList({ name: this.search }, page)
          : this.visaService.getVisaList(page);
      request.subscribe((result) => {
        this.seedTable(result);
      }, () => {
        this.notificationService.error();
        this.isLoadingSearchResult = false;
      })
  }

  createRange(number: number){
    return new Array(number);
  }

  updateTableOnSearch() {
    if (this.search) {
      this.isSearching = true;
      this.isLoadingSearchResult = true;
      this.visaService.filterVisaList({
        name: this.search
      }).subscribe((result) => {
        this.seedTable(result);
      })
    }
    else  {
      this.isSearching = false;
      this.updatePagination(1)
    }
  }

  seedTable(data: HttpPaginateResponse) {
    this.visas = data.items.map((visa: any) => new VisaRequest(visa));
    this.pagination = new Paginations(data._links);
    this.isLoadingSearchResult = false;
  }
}
