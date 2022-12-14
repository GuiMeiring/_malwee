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
  listaProduct: Array<any>=[];
  requests: Array<any>=[];
  products : Array<any>=[];
  product : Array<any>=[];
  search: string ='';
  client : Array<any>= [];
  startDate : Date = new Date();
  DateDelivery: Date = new Date();
  nameClient: string ='';
  fkClients: number =0;
  address: Array<any>=[];
  fkAddress: number | undefined;
  rua: string='';
  fkProducts: number =0;
  amount: number=1;
  unitPrice: number | undefined;
discount: number =0;
increase: number =0;
totalProduct: any;
total: number =0;
description: string='';
selectedAddress: number=0;
denovo : number=0;
totalProduct2: number=0;


  constructor(public dialogRef: MatDialogRef<ModalAddRequestsComponent>, private httpService : HttpService,
    @Inject(MAT_DIALOG_DATA) private data : DialogDataRequests,public dialog : MatDialog) { }

   async ngOnInit() {
    let teste=34.987;
        let teste1=''
        teste1=teste.toFixed(2);
        console.log(teste1)
    await this.listarProducts();
    this.requests.push(this.data.requests);
    await this.get();
    await this.listaClients();

  }
  async listaClients(){
    this.client= await this.httpService.get('client');
    console.log(this.client);


  }
  
  async addProduct(description:string, id: number, salePrice: number) {
    console.log(id)
    this.fkProducts=id;
    this.description= description;
    this.totalProduct=salePrice;
    this.totalProduct2= this.totalProduct;
    this.denovo=1;
    
    this.unitPrice= salePrice;
    this.product= await this.httpService.get(`products/${id}`);
      console.log(this.product);
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
    async listarProducts(){
      this.products= await this.httpService.get('products');
      console.log(this.products);
  
  
    }
    async addEndereco(){
     console.log(this.fkProducts) ;
      this.description='';
      this.listaProduct.push({"fkProducts": this.fkProducts, "amount": this.amount, "unitPrice":this.unitPrice,"discount":this.discount,"increase":this.increase, "total": this.totalProduct2})
      console.log(this.product);
      this.total=+ this.totalProduct2;
      this.denovo=0;
    }
    async addRequests() {
      console.log(this.fkClients);
      this.requests= await this.httpService.post('requests', {fkClients: this.fkClients,  DateEmission: this.startDate, DateDelivery: this.DateDelivery, fkAddress: this.selectedAddress, total: this.total,prodRequests: this.listaProduct} );
      this.onNoClick();
      }
      public insertTotalQtd(){
        console.log(this.amount);
        this.totalProduct2= this.totalProduct * this.amount;
      }
      public insertTotalDesc(){
        this.totalProduct2=this.totalProduct-((this.totalProduct2 *this.discount)/100);
        console.log(this.totalProduct);
      }
      public insertTotalAcres(){
        this.totalProduct2=this.totalProduct+((this.totalProduct2 *this.increase)/100);
        this.totalProduct2= this.totalProduct.toFixed(2);
        
      }

}
