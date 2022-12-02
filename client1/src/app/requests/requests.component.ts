import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpService } from 'src/services/HttpService';
import { ModalAddRequestsComponent } from '../modal-add-requests/modal-add-requests.component';

export interface DialogDataRequests {
  requests: Array<any>;
}

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  
search: any;
add: any;
requests: Array<any>=[];

  constructor(private router : Router, private httpService : HttpService, public dialog : MatDialog) { }

  ngOnInit(): void {
    this.listRequests();
  }
  public postRequests() {
    const ref = this.dialog.open(ModalAddRequestsComponent, {
      width: '600px',
      data: {requests: this.requests}
    });
    ref.afterClosed().subscribe((result: any) => {
      this.listRequests();
    })
  }
  async listRequests(){
    this.requests= await this.httpService.get('requests');

  }
    }


