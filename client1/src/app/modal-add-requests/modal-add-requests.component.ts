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
  DateDelivery: any;
  startdate : any;
  dia: number | undefined;
  nameClient: string ='';
  fkClients: number | undefined;
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
denovo : number=0;
totalString: string='';


  constructor(public dialogRef: MatDialogRef<ModalAddRequestsComponent>, private httpService : HttpService,
    @Inject(MAT_DIALOG_DATA) private data : DialogDataRequests,public dialog : MatDialog) { }

   async ngOnInit() {
    let teste=34.987;
        let teste1=''
        teste1=teste.toFixed(2);
        console.log(teste1)
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
  
  async addProduct(description:string, id: number, salePrice: number) {
    console.log(id)
    this.fkProducts=id;
    this.description= description;
    this.totalProduct=salePrice;
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
     console.log(this.fkProducts) ;
      this.description='';
      this.listaProduct.push({"fkProducts": this.fkProducts, "amount": this.amount, "unitPrice":this.unitPrice,"discount":this.discount,"increase":this.increase, "total": this.totalProduct})
      console.log(this.product);
      this.total=+ this.totalProduct;
      this.denovo=0;
    }
    async addRequests() {
      console.log(this.fkClients);
      this.requests= await this.httpService.post('requests', {fkClients: this.fkClients,  DateEmission: this.startDate, DateDelivery: this.DateDelivery, fkAddress: this.fkAddress, total: this.total,prodRequests: this.listaProduct} );
      this.onNoClick();
      }
      public insertTotalQtd(){
        console.log(this.amount);
        this.totalProduct=this.totalProduct * this.amount;

        this.totalString= this.totalProduct.toFixed(2);
        console.log(this.totalString)
      }
      public insertTotalDesc(){
        this.totalProduct=this.totalProduct-((this.totalProduct *this.discount)/100);
        console.log(this.totalProduct);
      }
      public insertTotalAcres(){
        this.totalProduct=this.totalProduct+((this.totalProduct *this.increase)/100);
        this.totalProduct= this.totalProduct.toFixed(2);
        
      }

}
