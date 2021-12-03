import { Component, OnInit } from '@angular/core';
import {UtilsService} from '../../../services/utils/utils.service';
import {Router} from '@angular/router';
import {CUSTOMERS_LINK, HOME_LINK, RESELLERS_LINK, TRANSACTIONS_LINK, VISA_REQUESTS_LINK, VISAS_LINK} from '../../../utils/constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public utilsService: UtilsService, private router: Router) { }

  ngOnInit(): void {
  }

  goTo(page: string) {
    switch (page) {
      case 'dashboard':
        this.router.navigate([HOME_LINK]);
        break;
      case 'reseller-list':
        this.router.navigate([RESELLERS_LINK]);
        break;
      case 'transaction-list':
        this.router.navigate([TRANSACTIONS_LINK]);
        break;
      case 'customer-list':
        this.router.navigate([CUSTOMERS_LINK]);
        break;
      case 'visa-list':
        this.router.navigate([VISAS_LINK]);
        break;
      case 'visa-request-list':
        this.router.navigate([VISA_REQUESTS_LINK]);
        break;
      default:
        this.router.navigate([HOME_LINK]);
        break;
    }
  }

}
