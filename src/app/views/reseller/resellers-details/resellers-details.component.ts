import {Component, OnInit} from '@angular/core';
import {AgentsService} from '../../../services/agents/agents.service';
import {UtilsService} from '../../../services/utils/utils.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../../services/notification/notification.service';
import {Agent, Transactions, TransactionStatus, TransactionType} from '../../../models/interfaces/agent';

@Component({
  selector: 'app-resellers-details',
  templateUrl: './resellers-details.component.html',
  styleUrls: ['./resellers-details.component.scss']
})
export class ResellersDetailsComponent implements OnInit {

  reseller: Agent | any = null;
  dtOptions: DataTables.Settings = {};
  isLoadingTransactions: boolean = true;
  transactions: Transactions[] = [];
  currentTransaction!: Transactions;
  isLoadingDocuments: boolean = false;
  documents: any[] = [];
  hasLoadDocument: boolean = false;
  constructor(private agentService: AgentsService, public utilsService: UtilsService, private route: ActivatedRoute,  private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.dtOptions = {
      searching: false,
      ordering: false,
      paging: false,
      info: false
    };

    this.route.params.subscribe((param) => {
      this.agentService.getOneAgents(param.id).subscribe((response) => {
        this.reseller = response;
      });
      this.agentService.getAgentTransactions(param.id).subscribe((response) => {
        this.transactions = response.items;
        this.isLoadingTransactions = false;
      })
    })
  }

  getFullName() {
    if (!this.reseller || (!this.reseller?.firstname && !this.reseller?.lastname)){
      return '--'
    }
    return this.reseller?.firstname + ' ' + this.reseller?.lastname;
  }

  getState() {
    if (this.reseller?.status) {
      switch (this.reseller.status) {
        case TransactionStatus.APPROVED:
          return 'APPROVED';
        case TransactionStatus.PENDING:
          return 'PENDING';
      }
    }
    return '--';
  }

  formatType(type: any) {
    if (type) {
      switch (type) {
        case TransactionType.PAYMENT:
          return 'Visa Payment';
        case TransactionType.DEPOSIT:
          return 'Deposit';
      }
    }
    return '--';
  }

  showDetails(transaction: Transactions) {
    if (this.isDepositTransaction(transaction)){
      if (this.currentTransaction?.id !== transaction?.id) {
        this.currentTransaction = transaction;
        this.hasLoadDocument = false;
      }
    }
  }

  isDepositTransaction(transaction: Transactions) {
    return transaction.type === TransactionType.DEPOSIT
  }

  isWithdrawTransaction(transaction: Transactions) {
    return transaction.type === TransactionType.PAYMENT
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
}
