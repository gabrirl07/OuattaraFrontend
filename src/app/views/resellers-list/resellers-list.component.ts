import { Component, OnInit } from '@angular/core';
import {Pagination} from '../../models/global';
import {Router} from '@angular/router';
import {NotificationService} from '../../services/notification/notification.service';
import {AgentsService} from '../../services/agents/agents.service';
import {Agent} from '../../models/agent';
import {UtilsService} from '../../services/utils/utils.service';

@Component({
  selector: 'app-resellers-list',
  templateUrl: './resellers-list.component.html',
  styleUrls: ['./resellers-list.component.scss']
})
export class ResellersListComponent implements OnInit {

  agents!: Agent[] | null;
  dtOptions: DataTables.Settings = {};
  stats: any;
  pagination!: Pagination | null;
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
      this.agents = result.items;
      this.pagination = result?._links ? {
        items_count: result?.items_count,
        total_page: result?.total_page,
        next: result?.next,
        self: result?.self,
        previous: result?.previous
      } : null;
      console.log(this.pagination);
    });
  }

  showDetails(resellerId: string) {
    this.router.navigate([`/company/reselers/${resellerId}`]);
  }

  updatePagination(page: any) {
    this.agents = null;
    this.pagination = null;
    let request = this.isSearching ? this.agentService.filterList({ query: this.search }, page) : this.agentService.getAllAgents(page);
    request.subscribe((result) => {
      this.agents = result.items;
      this.pagination = result._links ? {
        items_count: result?.items_count,
        total_page: result?.total_page,
        next: result?.next,
        self: result?.self,
        previous: result?.previous
      } : null;
      this.isLoadingSearchResult = false;
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
        this.agents = result.items;
        this.pagination = result._links ? {
          items_count: result?.items_count,
          total_page: result?.total_page,
          next: result?.next,
          self: result?.self,
          previous: result?.previous
        } : null;
        this.isLoadingSearchResult = false;
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
}
