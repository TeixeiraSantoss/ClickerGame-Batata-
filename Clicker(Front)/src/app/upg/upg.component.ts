import { Component } from '@angular/core';
import { DataServiceService } from '../service/data-service.service';
import { Upgrade } from '../models/upgrade.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upg',
  templateUrl: './upg.component.html',
  styleUrls: ['./upg.component.css']
})
export class UpgComponent {

  constructor(public dataService: DataServiceService,
    private cliente: HttpClient
  ){}

  Upgrades: Upgrade[] = []

  fazendeiro: number = 0;
  bpsFazendeiro: number = 0;
  valorFazendeiro: number = 5;

  colheitadeira: number = 0;
  bpsColheitadeira: number = 0;
  valorColheitadeira: number = 100;

  bps: number = 0;

  ngOnInit(): void{
    this.Upgrades = []
    //Chamada na API para receber os Upgrades que estão salvos no BD
    this.cliente.get<Upgrade[]>("https://localhost:7297/api/envupgrade")
    .subscribe
    (
      response => {
        console.table(response)

        this.Upgrades = response;
        //console.table(this.Upgrades)

        //Atribuido o valor da "response" a "fazendeiro" e "colheitadeira"
        this.fazendeiro = response[0].qtdFazendeiro
        this.colheitadeira = response[0].qtdColheitadeira
        
        console.log(this.fazendeiro)
        console.log(this.colheitadeira)
        this.startBps();
      },
      error => console.log(error)
    );
    //console.log(this.bps)

    //Salva a quantidade de Upgrades de 1 em 1 minuto
    setInterval(() => {
      if (this.Upgrades !== undefined && this.Upgrades.length > 0) {
        //console.log("Dentro do If");
    
        for (let i = 0; i < this.Upgrades.length; i++) {
          //console.log("Entrou no For");
          //console.log("Valor i: " + i);
  
          const upgrade = this.Upgrades[i];
          upgrade.qtdFazendeiro = this.fazendeiro
          upgrade.qtdColheitadeira = this.colheitadeira

          this.cliente.post<Upgrade>("https://localhost:7297/api/salvarupgrade/" + upgrade.id, upgrade)
            .subscribe(
              next => console.log("Fazendeiros salvos: " + next.qtdFazendeiro + "\nColheitadeiras salvas: " + next.qtdColheitadeira),
              error => console.log(error)
            );
        }
      } else {
        console.log("Array de batatas vazio ou indefinido.");
      }
      //console.log("Fora do If");

    }, 10000);
  }

  //Comprar Fazendeira
  buyFazendeiro(){
    //Condição para comprar um fazendeiro
    if(this.dataService.variavelCompBatata >= this.valorFazendeiro){
      //console.log("Antes do incremento:" + this.valorFazendeiro);
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

      //console.log("Depois do incremento:" + this.valorFazendeiro);
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

  //Metodo que vai ser execultado ao abrir o componente
  //Esse metodo vai fazer o calculo de BPS a partir dos dados recebidos da API
  startBps(){
    this.bps = this.fazendeiro + (this.colheitadeira * 5);
    this.bpsColheitadeira = this.colheitadeira * 5;
    this.bpsFazendeiro += this.fazendeiro;
    this.dataService.variavelCompBps = this.bps
  }
  
}