import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpService } from 'src/services/HttpService';
import { ModalProRequestsComponent } from '../modal-pro-requests/modal-pro-requests.component';

export interface DialogDataRequests {
  products: Array<any>;
  requests: Array<any>;
}

@Component({
  selector: 'app-modal-add-requests',
  templateUrl: './modal-add-requests.component.html',
  styleUrls: ['./modal-add-requests.component.scss']
})
export class ModalAddRequestsComponent implements OnInit {
  dataAtual=new Date();
  requests: Array<any>=[];
  products : Array<any>=[];
  product : Array<any>=[];
  search: string ='';
  client : Array<any>= [];
  startDate : Date = new Date();
  DateDelivery: any;
  startdate : any;
  dia: number | undefined;
  nameClient: string ='';
  fkClients: number | undefined;
  address: Array<any>=[];
  fkAddress: number | undefined;
  rua: string='';
  selectedProduct: number | undefined;
  amount: any;
  unitPrice: number | undefined;
discount: any;
increase: any;
total: any;


  constructor(public dialogRef: MatDialogRef<ModalAddRequestsComponent>, private httpService : HttpService,
    @Inject(MAT_DIALOG_DATA) private data : DialogDataRequests,public dialog : MatDialog) { }

   async ngOnInit() {
    await this.listarProducts();
    this.requests.push(this.data.requests);
    let dia =String(this.startDate.getDate()).padStart(2,'0');
    let mes =String(this.startDate.getMonth()+1).padStart(2,'0');
    let ano =this.startDate.getFullYear();
    this.dia = parseInt(dia)+7;
    this.DateDelivery= new Date(`${ano}/${mes}/${this.dia}`);
    
    await this.get();
    
    await this.listaClients();

  }
  async listaClients(){
    this.client= await this.httpService.get('client');
    console.log(this.client);


  }
  async get(){
    this.requests = await this.httpService.get('requests')
  }
  public addNameClient(name: string, id: number){
          this.nameClient=name;
          this.fkClients=id;
          this.listaAddress();
      }
      async listaAddress(){
        this.address= await this.httpService.get(`client/${this.fkClients}`);
        console.log(this.address);


      }
      public addAddress(rua: string, idAddress: number){
        this.rua= rua;
        this.fkAddress=idAddress;
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
    postProductsModal(): void {
      const ref = this.dialog.open(ModalProRequestsComponent, {
        width: '600px',
        data: {products: this.products, requests: this.requests}
      });
      ref.afterClosed().subscribe(result => {
        this.get();
      })
    }
    
    async listarProducts(){
      this.products= await this.httpService.get('products');
      console.log(this.products);
  
  
    }
    async addEndereco(){
      this.product.push({"fkProducts": this.selectedProduct, "amount": this.amount, "unitPrice":this.unitPrice,"discount":this.discount,"increase":this.increase, "total": this.total})
      console.log(this.product);
    }
    async addRequests() {
      this.requests= await this.httpService.post('requests', {fkClients: this.fkClients,  DateEmission: this.startDate, DateDelivery: this.DateDelivery, fkAddress: this.fkAddress, total: this.total,prodRequests: this.product} );
      this.onNoClick();
      }

}
