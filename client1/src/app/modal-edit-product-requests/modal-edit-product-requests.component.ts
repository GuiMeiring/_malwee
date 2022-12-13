import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/services/HttpService';
import { threadId } from 'worker_threads';

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
  selector: 'app-modal-edit-product-requests',
  templateUrl: './modal-edit-product-requests.component.html',
  styleUrls: ['./modal-edit-product-requests.component.scss']
})
export class ModalEditProductRequestsComponent implements OnInit {
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
  fkClients: number =0;
  address: Array<any>=[];
  fkAddress: number | undefined;
  rua: string='';
  fkProducts: number =0;
  amount: number=1;
  unitPrice: number=this.data.salePrice;
discount: number =0;
increase: number =0;
totalProduct: number =this.data.salePrice;
total: number =0;
description: string='';
denovo : number=0;
totalString: string='';
selectedteste: number=0;

  constructor(public dialogRef: MatDialogRef<ModalEditProductRequestsComponent>, private httpService : HttpService,
    @Inject(MAT_DIALOG_DATA) private data : DialogDataRequests) { }

  ngOnInit(): void {
    this.listarProduct();
    console.log(this.totalProduct)
    console.log(this.data.salePrice)

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  async listarProduct(){
        this.product= await this.httpService.get(`requests/${localStorage.getItem("idProductRequestsEdit")}`);
        console.log(this.product);


      }

  public put(){
    this.addProduct();
    this.editRequests();
    this.onNoClick();
  }
  async addProduct(){
    this.product.push({"id": localStorage.getItem("idProductRequestsEdit"),"fkProducts": this.data.fkProduct, "amount": this.amount, "unitPrice":this.unitPrice,"discount":this.discount,"increase":this.increase, "total": this.totalProduct})
  }
  async editRequests() {
    console.log(this.fkProducts);
    console.log(this.total);
    this.total= this.data.total - this.data.totalProduct;
    console.log(this.total);
    console.log(this.data.totalProduct);
    this.total=this.total + this.totalProduct;
    console.log(this.data.fkClients);
    this.requests= await this.httpService.put('requests', {fkClients: this.data.fkClients,  DateEmission: this.startDate, DateDelivery: this.DateDelivery, fkAddress: this.data.fkAddress, total: this.total,prodRequests: this.product, fkRequests: this.data.fkRequests} );
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
    
  }


}
