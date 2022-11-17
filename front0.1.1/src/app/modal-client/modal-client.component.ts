import { Component, Inject, OnInit } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpService } from 'src/services/HttpService';
export interface DialogDataClient {
  client : Array<any>;
  id: number;
  razaoSocial: string;
  name: string;
}

@Component({
  selector: 'app-modal-client',
  templateUrl: './modal-client.component.html',
  styleUrls: ['./modal-client.component.scss']
})
export class ModalClientComponent implements OnInit {
  client: Array<any>=[];
  endereco: Array<any>=[];
  editEndereco: Array<any>=[];
  name: string ='';
  cnpj: number | undefined;
  razaoSocial: string ='';
  startDate : Date = new Date(2022, 0, 1);
  rua: string='';
  bairro: string ='';
  cidade: string='';
  estado: string ='';
  pontoDeReferencia: string ='';
  complemento: string ='';
  numero: string ='';
  cep: string ='';
  selectedEndereco: number=0;





  constructor(public dialogRef: MatDialogRef<ModalClientComponent>, private httpService : HttpService,
    @Inject(MAT_DIALOG_DATA) private data : DialogDataClient) { }

  ngOnInit(): void {
    this.client.push(this.data.client);
    this.getClient();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  async editClient(){
    this.client= await this.httpService.put(`client`,{name:this.name,razaoSocial: this.razaoSocial, idClient  : this.data.id, address: this.editEndereco, idEndereco : this.selectedEndereco});
    this.dialogRef.close();
  }
  async getClient(){
    this.endereco= await this.httpService.get(`client/${this.data.id}`);
    console.log(this.endereco);
  }
  async deleteClient(){
    this.client= await this.httpService.patch(`client/${this.data.id}`,{});
    this.dialogRef.close();
  }
  public put(){
    if(this.name ==''){
      this.name= this.data.name;
    }
    if(this.razaoSocial==''){
      this.razaoSocial= this.data.razaoSocial;
    }
    console.log(this.name);
    console.log(this.razaoSocial);
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

  async addEndereco(){
    this.editEndereco.push({"id":this.selectedEndereco,"rua":this.rua,"bairro":this.bairro,
    "cidade":this.cidade,
    "estado":this.estado,
    "cep":this.cep,
    "numero":this.numero,
    "complemento":this.complemento,
    "pontoDeReferencia":this.pontoDeReferencia})
    this.refresh();
    console.log(this.editEndereco);

  }

  async DeleteEndereco(){
    this.endereco= await this.httpService.patch(`ClientsEndereco/${this.selectedEndereco}`,{});
    this.onNoClick();
  }
}


