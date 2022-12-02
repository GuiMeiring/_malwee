import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/services/HttpService';

@Component({
  selector: 'app-modal-add-requests',
  templateUrl: './modal-add-requests.component.html',
  styleUrls: ['./modal-add-requests.component.scss']
})
export class ModalAddRequestsComponent implements OnInit {

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


  constructor(private router : Router, private httpService: HttpService) { }

  ngOnInit(): void {
    this.listaClients();
    let dia =String(this.startDate.getDate()).padStart(2,'0');
    console.log(dia);
    let mes =String(this.startDate.getMonth()+1).padStart(2,'0');
    console.log(mes);
    let ano =this.startDate.getFullYear();
    console.log(ano);
    this.startdate = (`${mes}/${dia}/${ano}`);
    this.startDate = this.startdate;
    this.dia = parseInt(dia)+7;
    this.DateDelivery= new Date(`${mes}/${this.dia}/${ano}`);
  }
  async listaClients(){
    this.client= await this.httpService.get('client');
    console.log(this.client);


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



}
