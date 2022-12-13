import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/services/HttpService';
import { ModalDeleteProductRequestsComponent } from '../modal-delete-product-requests/modal-delete-product-requests.component';
import { ModalEditProductRequestsComponent } from '../modal-edit-product-requests/modal-edit-product-requests.component';
export interface DialogDataRequests {
  requests: Array<any>;
  id: number;
  fkClients:number;
  DateEmisson: Date;
  DateDelivery: Date;
  fkAddress: number;
  total: number;
  prodRequests: Array<any>;
  salePrice: number;
  fkProduct: number;
  totalProduct: number;
  fkRequests: number;
}
@Component({
  selector: 'app-modal-edit-requests',
  templateUrl: './modal-edit-requests.component.html',
  styleUrls: ['./modal-edit-requests.component.scss']
})
export class ModalEditRequestsComponent implements OnInit {

  requests: Array<any>=[];
  products: Array<any>=[];
  address: Array<any>=[];
  selectedAddress: number=this.data.fkAddress;
  startDate: Date= this.data.DateEmisson;
  DateDelivery: Date= this.data.DateDelivery;

  constructor(public dialogRef: MatDialogRef<ModalEditRequestsComponent>, private httpService : HttpService,
    @Inject(MAT_DIALOG_DATA) private data : DialogDataRequests, private dialog : MatDialog) { }

  async ngOnInit(){
    this.requests.push(this.data.requests);
    await this.listaProducts();
    await this.listaAddress();
    
    

  }
  async listaProducts(){
    this.products=  await this.httpService.get(`requests/${this.data.id}`);
    console.log(this.products);
  }
  async listaAddress(){
        this.address= await this.httpService.get(`client/${this.data.id}`);
        console.log(this.address);
   }
   openDeleteProduct(id: any){
    window.localStorage.setItem('idProductRequestsEdit', id);
    const dialogoRef = this.dialog.open(ModalDeleteProductRequestsComponent, {
      width: '400px',
    });
    dialogoRef.afterClosed().subscribe((result : any) => {
      this.listaProducts();
    })
  }
  openEditProduct(id: any, salePrice: number, fkProduct: number,totalProduct: number, fkRequests: number ){
    console.log(salePrice);
    window.localStorage.setItem('idProductRequestsEdit', id);
      const dialogoRef = this.dialog.open(ModalEditProductRequestsComponent, {
        width: '600px',
        
        data: {requests: this.data.requests, id: this.data.id, fkClients: this.data.fkClients,  DateEmission: this.startDate, DateDelivery: this.DateDelivery, fkAddress: this.selectedAddress, total: this.data.total,prodRequests: this.products, salePrice : salePrice, fkProduct: fkProduct, totalProduct: totalProduct, fkRequests: fkRequests}
      });
      dialogoRef.afterClosed().subscribe((result : any) => {
        this.listaProducts();
      })

    }
  }
