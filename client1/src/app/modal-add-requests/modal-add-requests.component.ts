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
  DateDelivery: Date= new Date();
  startdate : any;


  constructor(private router : Router, private httpService: HttpService) { }

  ngOnInit(): void {
    this.listaClients();
    let dia =String(this.startDate.getDate()).padStart(2,'0');
    console.log(dia);
    let mes =String(this.startDate.getMonth()+1).padStart(2,'0');
    console.log(mes);
    const ano =this.startDate.getFullYear();
    console.log(ano);
    this.startdate = (`${mes}/${dia}/${ano}`);
    this.startDate = this.startdate;
    console.log(this.startDate);

  }
  async listaClients(){
    this.client= await this.httpService.get('client');
    console.log(this.client);


  }


}
