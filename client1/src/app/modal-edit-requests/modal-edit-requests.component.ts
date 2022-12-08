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

  constructor(public dialogRef: MatDialogRef<ModalEditRequestsComponent>, private httpService : HttpService,
    @Inject(MAT_DIALOG_DATA) private data : DialogDataRequests) { }

  ngOnInit(): void {
  }

}
