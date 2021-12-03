import { Component, OnInit } from '@angular/core';
import {Paginations} from '../../../models/classes/Paginations';
import {UtilsService} from '../../../services/utils/utils.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../../services/notification/notification.service';
import {HttpPaginateResponse} from '../../../models/interfaces/global';
import {TransactionsService} from '../../../services/transactions/transactions.service';
import {Transaction as TransactionClass} from '../../../models/classes/Transaction';
import {Transactions as ITransaction} from '../../../models/interfaces/agent';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  transactions!: TransactionClass[] | null;
  dtOptions: DataTables.Settings = {};
  pagination!: Paginations | null;
  isLoadingSearchResult: boolean = false;

  constructor(
      public transactionService: TransactionsService,
      public utilsService: UtilsService, private router: Router, private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      searching: false,
      ordering: false,
      paging: false,
      info: false
    };

    this.transactionService.sendRequest(this.buildRequestURL()).subscribe((result) => {
      this.seedTable(result);
    });
  }

  updatePagination(page: any) {
    this.updateTable(this.buildRequestURL(page))
  }

  updateTable(url : string) {
    this.isLoadingSearchResult = true;
    this.transactionService.sendRequest(url).subscribe((result) => {
      this.seedTable(result);
    }, () => {
      this.notificationService.error();
    })
  }

  seedTable(data: HttpPaginateResponse) {
    this.transactions = data.items.map((transaction: ITransaction) => new TransactionClass(transaction, transaction.user.reseller));
    this.pagination = new Paginations(data._links);
    this.isLoadingSearchResult = false;
  }

  buildRequestURL( page: number = 1, params: string = '',) {

    let url = `${this.transactionService.TRANSACTIONS_LIST_PAGINATION_URL}&page=${page}`;

    if (params) {
      url = `${url}&${params}`
    }

    return url;
  }


}
