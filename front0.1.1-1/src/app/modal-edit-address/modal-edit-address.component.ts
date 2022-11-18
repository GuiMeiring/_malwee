import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/services/HttpService';


export interface DialogDataAddress {
  id: number;
}

@Component({
  selector: 'app-modal-edit-address',
  templateUrl: './modal-edit-address.component.html',
  styleUrls: ['./modal-edit-address.component.scss']
})
export class ModalEditAddressComponent implements OnInit {
  rua: string='';
  bairro: string ='';
  cidade: string='';
  estado: string ='';
  pontoDeReferencia: string ='';
  complemento: string ='';
  numero: string ='';
  cep: string ='';
  editEndereco: Array<any>=[];
  client: Array<any>=[];
  endereco: Array<any>=[];
  name: string ='';
  cnpj: number | undefined;
  razaoSocial: string ='';
  startDate : Date = new Date(2022, 0, 1);
  
  selectedEndereco: number =0;

  constructor(public dialogRef: MatDialogRef<ModalEditAddressComponent>, private httpService : HttpService) { }

  ngOnInit(): void {
  }
  public put(){
   // if(this.name ==''){
   //   this.name= this.data.name;
   // }
    //if(this.razaoSocial==''){
   //   this.razaoSocial= //this.data.razaoSocial;
   // }
    console.log(this.name);
    console.log(this.razaoSocial);
    this.addAddress();
    this.editClient();
  }
  public refresh(){
    this.selectedEndereco=0;
    this.rua='';
    this.bairro='';
    this.cidade='';
    this.estado='';
    this.cep='';
    this.numero='';
    this.complemento='';
    this.pontoDeReferencia='';
  }

  async addAddress(){
    this.editEndereco.push({"id":this.selectedEndereco,"rua":this.rua,"bairro":this.bairro,
    "cidade":this.cidade,
    "estado":this.estado,
    "cep":this.cep,
    "numero":this.numero,
    "complemento":this.complemento,
    "pontoDeReferencia":this.pontoDeReferencia})

  }
  async editClient(){
    this.client= await this.httpService.put(`client`,{name:this.name,razaoSocial: this.razaoSocial, idClient  : this.data.id, address: this.editEndereco, idEndereco : this.selectedEndereco});
  }
  cancelar(){
    this.selectedEndereco=0;
  }
  

}
