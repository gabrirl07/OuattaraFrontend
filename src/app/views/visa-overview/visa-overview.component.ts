import { Component, OnInit } from '@angular/core';
import {Visa, VisaList} from '../../models/visa/visa';
import {VisaService} from "../../services/visa/visa.service";
import { Router} from "@angular/router";
import {forkJoin} from "rxjs";
import {Pagination} from '../../models/global';

@Component({
  selector: 'app-visa-overview',
  templateUrl: './visa-overview.component.html',
  styleUrls: ['./visa-overview.component.scss']
})
export class VisaOverviewComponent implements OnInit {
  visas!: Visa[] | null;
  dtOptions: DataTables.Settings = {};
  stats: any;
  pagination!: Pagination | null;

  constructor(private visaService: VisaService, private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      searching: false,
      ordering: false,
      paging: false,
      info: false
    };

    let request = [];
    request.push(this.visaService.getDashboardStats());
    request.push(this.visaService.getVisaList());
    forkJoin([...request]).subscribe((result) => {
      console.log(result);
      this.stats = result[0];
      this.visas = result[1].items;
      this.pagination = result[1]?._links ? {
        items_count: result[1]?.items_count,
        total_page: result[1]?.total_page,
        next: result[1]?.next,
        self: result[1]?.self,
        previous: result[1]?.previous
      } : null;
    });

  }

  showDetails(visaId: string) {
    this.router.navigate([`/dashboard/visas/${visaId}`]);
  }

  preventNull(value: any){
    return value ? value : '--';
  }


  getProfilPicture(visa: any){
    return visa?.costumer?.customer_picture ?? 'assets/images/avatar.png';
  }

  updatePagination(page: any) {
      this.visas = null;
      this.pagination = null;
      this.visaService.getVisaList(page).subscribe((result) => {
        this.visas = result.items;
        this.pagination = result._links ? {
          items_count: result?._links,
          total_page: result?.total_page,
          next: result?.next,
          self: result?.self,
          previous: result?.previous
        } : null;
      });
  }

  createRange(number: number){
    return new Array(number);
  }
}
