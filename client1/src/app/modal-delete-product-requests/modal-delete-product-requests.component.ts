import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/services/HttpService';

@Component({
  selector: 'app-modal-delete-product-requests',
  templateUrl: './modal-delete-product-requests.component.html',
  styleUrls: ['./modal-delete-product-requests.component.scss']
})
export class ModalDeleteProductRequestsComponent implements OnInit {
  product: Array<any>=[];

  constructor(public dialogRef: MatDialogRef<ModalDeleteProductRequestsComponent>, private httpService : HttpService) { }

  ngOnInit(): void {
  }
  async deleteAddress() {
    this.product= await this.httpService.patch(`ProdRequests/${localStorage.getItem("idProductRequestsEdit")}`,{});
    this.onNoClick();
   
    }
    onNoClick(): void {
      this.dialogRef.close();
    }

}
