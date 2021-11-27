import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private router: Router) { }

  preventNull(value: any, placeholder = '--'){
    return value ? value : placeholder;
  }

  createRange(number: number){
    return new Array(number);
  }

  isRouteActive(commande: string | any[], exact: boolean = true){
    if (typeof commande === 'string'){
      return this.router.isActive(this.router.createUrlTree([commande]), exact);
    }
    return this.router.isActive(this.router.createUrlTree(commande), exact);
  }



}
