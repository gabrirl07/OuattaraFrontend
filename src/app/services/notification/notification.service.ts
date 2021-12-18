import {Injectable} from '@angular/core';
import * as toastr from 'toastr';
import {HANDLE_ERROR_TYPE, HandleErrorInfo} from '../../models/interfaces/global';

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

  error(msg: string = '') {
    if (msg) {
      this.notifier.error(msg)
    }
    else {
      this.notifier.error('An error has occurred, please try again!')
    }
  }

  warning(msg:  string) {
    this.notifier.warning(msg)
  }

  displayHttpError(error: HandleErrorInfo) {
    if (error.type === HANDLE_ERROR_TYPE.ERROR) {
      this.error(error.popup);
    }
    if (error.type === HANDLE_ERROR_TYPE.WARNING) {
      this.warning(error.popup);
    }
    console.log(error.console);
  }

}
