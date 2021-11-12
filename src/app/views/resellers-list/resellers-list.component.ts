import { Component, OnInit } from '@angular/core';
import {HttpPaginateResponse, Pagination} from '../../models/interfaces/global';
import {Router} from '@angular/router';
import {NotificationService} from '../../services/notification/notification.service';
import {AgentsService} from '../../services/agents/agents.service';
import {Agent} from '../../models/interfaces/agent';
import {UtilsService} from '../../services/utils/utils.service';
import {Paginations} from '../../models/classes/Paginations';
import {VisaRequest} from '../../models/classes/VisaRequest';

@Component({
  selector: 'app-resellers-list',
  templateUrl: './resellers-list.component.html',
  styleUrls: ['./resellers-list.component.scss']
})
export class ResellersListComponent implements OnInit {

  agents!: Agent[] | null;
  dtOptions: DataTables.Settings = {};
  stats: any;
  pagination!: Paginations | null;
  isLoadingSearchResult: boolean = false;
  search: string = '';
  company: string = '';
  isSearching: boolean = false;

  constructor(private agentService: AgentsService, public utilsService: UtilsService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.dtOptions = {
      searching: false,
      ordering: false,
      paging: false,
      info: false
    };

    this.agentService.getAllAgents().subscribe((result) => {
      this.seedTable(result);
    });
  }

  showDetails(resellerId: string) {
    this.router.navigate([`/company/reselers/${resellerId}`]);
  }

  updatePagination(page: any) {
    this.agents = null;
    this.pagination = null;
    let request = this.isSearching
        ? this.agentService.filterList({ query: this.search }, page)
        : this.agentService.getAllAgents(page);
    request.subscribe((result) => {
      this.seedTable(result);
    }, () => {
      this.notificationService.error();
      this.isLoadingSearchResult = false;
    })
  }


  updateTableOnSearch() {
    if (this.search) {
      this.isSearching = true;
      this.isLoadingSearchResult = true;
      this.agentService.filterList({
        name: this.search
      }).subscribe((result) => {
        this.seedTable(result);
      }, () => {
        this.notificationService.error();
        this.isLoadingSearchResult = false;
      })
    }
    else  {
      this.isSearching = false;
      this.updatePagination(1)
    }
  }

  seedTable(data: HttpPaginateResponse) {
    this.agents = data.items;
    this.pagination = new Paginations(data._links);
    this.isLoadingSearchResult = false;
  }
}
