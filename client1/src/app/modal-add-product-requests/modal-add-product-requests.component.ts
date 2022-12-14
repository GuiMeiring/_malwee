import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/services/HttpService';
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
  selector: 'app-modal-add-product-requests',
  templateUrl: './modal-add-product-requests.component.html',
  styleUrls: ['./modal-add-product-requests.component.scss']
})



export class ModalAddProductRequestsComponent implements OnInit {
description: string='';
fkProducts: number=0;
  denovo: number=0;
  product: Array<any>=[];
  products: Array<any>=[];
  listaDeProducts: Array<any>=[];
  unitPrice: number=0;
discount: number=0;
amount: number =1;
  request: Array<any>=[];
  total: number =0;


totalProduct: number=0;
increase: number=0;
  total2: number=0;

  constructor(public dialogRef: MatDialogRef<ModalAddProductRequestsComponent>, private httpService : HttpService,
    @Inject(MAT_DIALOG_DATA) private data : DialogDataRequests,) { }

  ngOnInit(): void {
    this.listarProdutos();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  async listarProdutos(){
    this.products= await this.httpService.get(`products`);
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
    public insertTotalQtd(){
      console.log(this.amount);
      this.totalProduct=this.totalProduct * this.amount;

     
    }
    public insertTotalDesc(){
      this.totalProduct=this.totalProduct-((this.totalProduct *this.discount)/100);
      console.log(this.totalProduct);
    }
    public insertTotalAcres(){
      this.totalProduct=this.totalProduct+((this.totalProduct *this.increase)/100);
      
    }

    async addListaProduct(){
      this.description='';
      this.listaDeProducts.push({"fkProducts": this.fkProducts, "amount": this.amount, "unitPrice":this.unitPrice,"discount":this.discount,"increase":this.increase, "total": this.totalProduct})
      console.log("total" + this.data.total)
      console.log("produto" + this.totalProduct)
      this.total2 = parseFloat(`${this.data.total}`) + parseFloat(`${this.totalProduct}`);
      console.log("outro total" + this.total2)
      await this.post();
    }
    async post(){
      this.request= await this.httpService.post(`prodRequests`, {prodRequests: this.listaDeProducts, fkRequests: this.data.id} );
      console.log(this.request);
      this.request= await this.httpService.patch(`requestsAdd/${this.data.id}`, {total: this.total2} );
      this.onNoClick();
    }

}
