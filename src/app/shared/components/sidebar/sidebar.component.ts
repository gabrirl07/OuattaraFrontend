import { Component, OnInit } from '@angular/core';
import {UtilsService} from '../../../services/utils/utils.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public utilsService: UtilsService) { }

  ngOnInit(): void {
  }

}
