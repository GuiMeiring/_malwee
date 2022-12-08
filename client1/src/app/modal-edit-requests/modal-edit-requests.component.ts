import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/services/HttpService';
export interface DialogDataRequests {
  requests: Array<any>;
  id: number;
}

@Component({
  selector: 'app-modal-edit-requests',
  templateUrl: './modal-edit-requests.component.html',
  styleUrls: ['./modal-edit-requests.component.scss']
})
export class ModalEditRequestsComponent implements OnInit {
  requests: Array<any>=[];
  products: Array<any>=[];

  constructor(public dialogRef: MatDialogRef<ModalEditRequestsComponent>, private httpService : HttpService,
    @Inject(MAT_DIALOG_DATA) private data : DialogDataRequests) { }

  async ngOnInit(){
    this.requests.push(this.data.requests);
    this.products=  await this.httpService.get(`requests/${this.data.id}`);
    console.log(this.products);

  }

}
