import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpService } from 'src/services/HttpService';
import { ModalProRequestsComponent } from '../modal-pro-requests/modal-pro-requests.component';

export interface DialogDataRequests {
  requests: Array<any>;
}

@Component({
  selector: 'app-modal-add-requests',
  templateUrl: './modal-add-requests.component.html',
  styleUrls: ['./modal-add-requests.component.scss']
})
export class ModalAddRequestsComponent implements OnInit {
  requests: Array<any>=[];
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


  constructor(public dialogRef: MatDialogRef<ModalAddRequestsComponent>, private httpService : HttpService,
    @Inject(MAT_DIALOG_DATA) private data : DialogDataRequests,public dialog : MatDialog) { }

   async ngOnInit() {
    await this.get();
    this.requests.push(this.data.requests);
    console.log(this.requests);
    this.listaClients();
    let dia =String(this.startDate.getDate()).padStart(2,'0');
    console.log(dia);
    let mes =String(this.startDate.getMonth()+1).padStart(2,'0');
    console.log(mes);
    let ano =this.startDate.getFullYear();
    console.log(ano);
    this.startdate = (`${mes}/${dia}/${ano}`);
    this.dia = parseInt(dia)+7;
    console.log(dia)
    this.DateDelivery= new Date(`${ano}/${this.dia}/${mes}`);
    
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
        width: '600px'
      });
      ref.afterClosed().subscribe(result => {
        this.get();
      })
    }
}
