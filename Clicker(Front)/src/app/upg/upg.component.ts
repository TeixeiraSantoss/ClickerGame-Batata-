import { Component } from '@angular/core';
import { DataServiceService } from '../service/data-service.service';

@Component({
  selector: 'app-upg',
  templateUrl: './upg.component.html',
  styleUrls: ['./upg.component.css']
})
export class UpgComponent {

  constructor(public dataService: DataServiceService){}

  fazendeiro: number = 0;
  bpsFazendeiro: number = 0;

  colheitadeira: number = 0;
  bpsColheitadeira: number = 0;

  bps: number = 0;

  buyFazendeiro(){
    this.fazendeiro += 1;
      //Incrementa o bpm em 1 para cada fazendeiro
      for (let index = 1; index <= this.fazendeiro; index++) {
        this.bpsFazendeiro = this.fazendeiro;
      }
  }

  buyColheitadeira(){
    this.colheitadeira += 1;
    //Incrementa o bpm em 5 para cada fazendeiro
    for (let index = 1; index <= this.colheitadeira; index++) {
      this.bpsColheitadeira = this.colheitadeira*5;
    }
  }

  //Usando o "dataService" para enviar os dados do "bpm" para outros componentes
  envBpm(){
    this.bps = this.bpsFazendeiro + this.bpsColheitadeira;
    this.dataService.variavelCompartilhada = this.bps
  }
  
}