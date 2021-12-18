import { Component, OnInit } from '@angular/core';
import {HttpPaginateResponse} from '../../../models/interfaces/global';
import {Router} from '@angular/router';
import {NotificationService} from '../../../services/notification/notification.service';
import {AgentsService} from '../../../services/agents/agents.service';
import {Agent} from '../../../models/interfaces/agent';
import {UtilsService} from '../../../services/utils/utils.service';
import {Paginations} from '../../../models/classes/Paginations';
import {Resellers} from '../../../models/classes/Resellers';

@Component({
  selector: 'app-resellers-list',
  templateUrl: './resellers-list.component.html',
  styleUrls: ['./resellers-list.component.scss']
})
export class ResellersListComponent implements OnInit {

  agents!: Resellers[] | null;
  dtOptions: DataTables.Settings = {};
  stats: any;
  pagination!: Paginations | null;
  isLoadingSearchResult: boolean = false;
  search: string = '';
  company: string = '';
  isSearching: boolean = false;

  constructor(private resellerService: AgentsService, public utilsService: UtilsService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.dtOptions = {
      searching: false,
      ordering: false,
      paging: false,
      info: false
    };

    this.resellerService.sendRequest(this.buildRequestURL()).subscribe((result) => {
      this.seedTable(result);
    });
  }

  showDetails(resellerId: string) {
    this.router.navigate([`/company/resellers/${resellerId}`]);
  }

  updatePagination(page: any) {
    this.resellerService.sendRequest(this.buildRequestURL('', page)).subscribe((result) => {
      this.seedTable(result);
    }, () => {
      this.notificationService.error();
      this.isLoadingSearchResult = false;
    })
  }

  updateTable(url : string) {
    this.resellerService.sendRequest(url).subscribe((result) => {
      this.seedTable(result);
    }, () => {
      this.notificationService.error();
      this.isLoadingSearchResult = false;
    })
  }


  seedTable(data: HttpPaginateResponse) {
    this.agents = data.items.map((item: Agent) => new Resellers(item));
    this.pagination = new Paginations(data._links);
    this.isLoadingSearchResult = false;
  }

  buildRequestURL(params: string = '', page: number = 1) {

    let url = `${this.resellerService.AGENT_LIST_PAGINATION_URL}&page=${page}`;

    if (this.search) {
      url = `${url}&filter=${this.search}`
    }

    this.isLoadingSearchResult = true;

    return url;
  }

}
