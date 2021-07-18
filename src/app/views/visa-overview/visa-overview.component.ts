import { Component, OnInit } from '@angular/core';
import {VisaList} from "../../models/visa/visa";
import {VisaService} from "../../services/visa/visa.service";
import { Router} from "@angular/router";

@Component({
  selector: 'app-visa-overview',
  templateUrl: './visa-overview.component.html',
  styleUrls: ['./visa-overview.component.scss']
})
export class VisaOverviewComponent implements OnInit {
  visas!: VisaList;
  dtOptions: DataTables.Settings = {};
  constructor(private visaService: VisaService, private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full',
      searching: false,
      pageLength: 10,
      ordering: false,
    };
    this.visaService.getVisaList().subscribe((datas) => {
      this.visas = datas;
    })
  }

  showDetails(visaId: string) {
    this.router.navigate([`/dashboard/visas/${visaId}`]);
  }

  preventNull(value: any){
    return value ? value : '--';
  }

}
