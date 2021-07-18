import { Injectable } from '@angular/core';
import * as toastr from 'toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notifier: any;

  constructor() {
    this.notifier = toastr;
    this.notifier.options.progressBar = true;
  }

  success(msg:  string) {
    this.notifier.success(msg)
  }

  error(msg: string = 'Une erreur est survenue, veuillez réessayer svp !') {
    this.notifier.error(msg)
  }

  warning(msg:  string) {
    this.notifier.warning(msg)
  }

}
