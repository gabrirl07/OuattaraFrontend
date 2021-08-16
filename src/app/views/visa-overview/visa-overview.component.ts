import { Component, OnInit } from '@angular/core';
import {VisaList} from "../../models/visa/visa";
import {VisaService} from "../../services/visa/visa.service";
import { Router} from "@angular/router";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-visa-overview',
  templateUrl: './visa-overview.component.html',
  styleUrls: ['./visa-overview.component.scss']
})
export class VisaOverviewComponent implements OnInit {
  visas!: VisaList;
  dtOptions: DataTables.Settings = {};
  stats: any;

  constructor(private visaService: VisaService, private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full',
      searching: false,
      pageLength: 10,
      ordering: false,
    };

    let request = [];
    request.push(this.visaService.getDashboardStats());
    request.push(this.visaService.getVisaList());
    forkJoin([...request]).subscribe((result) => {
      this.stats = result[0];
      this.visas = result[1];
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

}
