import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {VisaService} from "../../services/visa/visa.service";
import {Visa} from "../../models/visa/visa";


@Component({
  selector: 'app-visa-details',
  templateUrl: './visa-details.component.html',
  styleUrls: ['./visa-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VisaDetailsComponent implements OnInit {

  visa!: Visa;

  constructor(
    private route: ActivatedRoute,
    private visaService: VisaService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.visaService.getVisa(param.id).subscribe((data) => {
        this.visa = data
      })
    })
  }

  getProfilName(){
    let firstname = this.visa?.costumer?.firstname ?? '';
    let lastname = this.visa?.costumer?.lastname ?? '';
    return firstname + ' ' + lastname;
  }

  preventNull(value: any){
    return value ? value : 'None';
  }

  openLigthbox($event: MouseEvent) {
    console.log($event.target)
  }
}
