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
  valorFazendeiro: number = 5;

  colheitadeira: number = 0;
  bpsColheitadeira: number = 0;
  valorColheitadeira: number = 100;

  bps: number = 0;

  //Comprar Fazendeira
  buyFazendeiro(){
    //Condição para comprar um fazendeiro
    if(this.dataService.variavelCompBatata >= this.valorFazendeiro){
      console.log("Antes do incremento:" + this.valorFazendeiro);
      //Compra um Fazendeiro
      this.fazendeiro += 1;

      //Subtrai o valor de compra da Qtd de Batatas
      this.dataService.variavelCompBatata -= this.valorFazendeiro;

      //Multiplica o valor necessario para comprar um fazendeiro
      this.valorFazendeiro *= 1.5;

        //Incrementa o bps em 1 para cada fazendeiro
        for (let index = 1; index <= this.fazendeiro; index++) {
          this.bpsFazendeiro = this.fazendeiro;
        }

      console.log("Depois do incremento:" + this.valorFazendeiro);
    }
  }

  //Comprar Colheitadeira
  buyColheitadeira(){
    //Condição para a compra do upgrade
    if(this.dataService.variavelCompBatata >= this.valorColheitadeira){
      //Compra Colheitadeira
      this.colheitadeira += 1;

      //Subtrai o valor de compra da Qtd de Batatas
      this.dataService.variavelCompBatata -= this.valorColheitadeira;

      //Incrementa o valor de compra da Colheitadeira
      this.valorColheitadeira *= 1.5;

        //Incrementa o bpm em 5 para cada fazendeiro
        for (let index = 1; index <= this.colheitadeira; index++) {
          this.bpsColheitadeira = this.colheitadeira*5;
        }
    }
  }

  //Usando o "dataService" para enviar os dados do "bpm" para outros componentes
  envBps(){
    this.bps = this.bpsFazendeiro + this.bpsColheitadeira;
    this.dataService.variavelCompBps = this.bps
    
    //Caso tenha algun upgrade a variavel "varUpg" recebe "true"
    if(this.fazendeiro >= 1){
      this.dataService.varUpg = true;
    } else if(this.colheitadeira >= 1){
        this.dataService.varUpg = true;
      }
  }
  
}