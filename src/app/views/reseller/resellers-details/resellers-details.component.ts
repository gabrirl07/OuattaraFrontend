import {Component, OnInit} from '@angular/core';
import {AgentsService} from '../../../services/agents/agents.service';
import {UtilsService} from '../../../services/utils/utils.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../../services/notification/notification.service';
import {Resellers} from '../../../models/classes/Resellers';
import {Transaction as TransactionClass} from '../../../models/classes/Transaction';
import {HttpPaginateResponse} from '../../../models/interfaces/global';
import {Paginations} from '../../../models/classes/Paginations';
import {Transactions} from '../../../models/interfaces/agent';
import {TransactionsService} from '../../../services/transactions/transactions.service';

@Component({
  selector: 'app-resellers-details',
  templateUrl: './resellers-details.component.html',
  styleUrls: ['./resellers-details.component.scss']
})
export class ResellersDetailsComponent implements OnInit {

  reseller: Resellers | any = null;
  dtOptions: DataTables.Settings = {};
  isLoadingTransactions: boolean = true;
  transactions: TransactionClass[] = [];
  currentTransaction!: TransactionClass;
  isLoadingDocuments: boolean = false;
  documents: any[] = [];
  hasLoadDocument: boolean = false;
  pagination!: Paginations | null;
  isLoadingSearchResult: boolean = false;
  isLoading: boolean = false;
  isLoadingTransactionDetails: boolean = false;


  constructor(public transactionService: TransactionsService, private agentService: AgentsService, public utilsService: UtilsService, private route: ActivatedRoute,  private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.dtOptions = {
      searching: false,
      ordering: false,
      paging: false,
      info: false
    };

    this.route.params.subscribe((param) => {
      this.agentService.getOneAgents(param.id).subscribe((response) => {
        this.reseller = new Resellers(response);
      });
      this.agentService.getAgentTransactions(param.id).subscribe((response) => {
        this.seedTable(response);
      })
    })
  }

  showDetails(transaction: TransactionClass) {
    if (transaction.isDepositTransaction){
      if (this.currentTransaction?.id !== transaction?.id) {
        this.isLoadingTransactionDetails = true;
        this.transactionService.getTransaction(transaction.id).subscribe((data) => {
          this.currentTransaction = new TransactionClass(data);
          this.isLoadingTransactionDetails = false;
        });
      }
    }
  }

  loadDocuments() {
    if (!this.hasLoadDocument) {
      this.isLoadingDocuments = true;
      this.agentService.getTransactionDocuments(this.currentTransaction.id).subscribe((data) => {
        this.documents = data.items;
        this.isLoadingDocuments = false;
        this.hasLoadDocument = true;
      });
    }
  }

  seedTable(data: HttpPaginateResponse) {
    this.transactions = data.items.map((transaction: Transactions) => new TransactionClass(transaction, transaction?.user?.reseller));
    this.pagination = new Paginations(data._links);
    this.isLoadingTransactions = false;
  }

  buildRequestURL(params: string = '', page: number = 1) {

    let url = `${this.agentService.AGENT_LIST_PAGINATION_URL}&page=${page}`;

    this.isLoadingTransactions = true;

    return url;
  }

  updatePagination(page: any) {
    this.agentService.requestResellers(this.buildRequestURL('', page)).subscribe((result) => {
      this.seedTable(result);
    }, () => {
      this.notificationService.error();
      this.isLoadingSearchResult = false;
    })
  }

  approveTransaction(transaction: TransactionClass) {
    this.isLoading = true;
    this.transactionService.approveTransaction(transaction.id).subscribe((data) => {
      this.transactionService.getTransaction(transaction.id).subscribe((data) => {
        this.currentTransaction = new TransactionClass(data);
        this.isLoading = false;
      });
    });
  }

}
