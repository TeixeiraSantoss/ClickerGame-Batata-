import { Batata } from './../models/batata.model';
import { Component } from '@angular/core';
import { DataServiceService } from '../service/data-service.service';
import { HttpClient } from '@angular/common/http';
import { repeat } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clicker',
  templateUrl: './clicker.component.html',
  styleUrls: ['./clicker.component.css']
})
export class ClickerComponent {

  constructor(public dataService: DataServiceService,
    private cliente: HttpClient,
    private router: Router
  ){}

  Batatas: Batata[] = [];

  qtdBatatasClick: number = 0;
  qtdBatatasBps: number = 0;

  ngOnInit(): void {
    this.Batatas = []
    //Chamada na API para receber a "qtdBatata" que esta salva no BD
    this.cliente.get<Batata[]>("https://localhost:7297/api/envbatata")
    .subscribe
    (
      response => {
        this.Batatas = response;
        //Atribuido o valor da "response" a "qtdBatatasClick"
        this.qtdBatatasClick = response[0].qtdBatata;
        
        //Atribuindo a "qtdBatatasClick" a "dataService.variavelCompBatata" 
        //para o valor que está no banco ser mostrado em tela ao carregar a pagina
        this.dataService.variavelCompBatata = this.qtdBatatasClick;        
      },
      error => console.log(error)
    );
    
    // Inicia a execução da função constantemente
    setInterval(() => {
      this.somarBps();
    }, 1000); // Define um intervalo de 1000 milissegundos (1 segundo)

    setInterval(() => {
      if (this.Batatas !== undefined && this.Batatas.length > 0) {
        //console.log("Dentro do If");
    
        for (let i = 0; i < this.Batatas.length; i++) {
          //console.log("Entrou no For");
          //console.log("Valor i: " + i);
  
          const batata = this.Batatas[i];
          batata.qtdBatata = this.dataService.variavelCompBatata
    
          // Arredonda para baixo para o número inteiro mais próximo
          const qtdBatataInteira = Math.floor(batata.qtdBatata);

          // Atualiza o valor de qtdBatata para o número inteiro
          batata.qtdBatata = qtdBatataInteira;

          //console.log("qtdBatata: " + batata.qtdBatata)

          this.cliente.post<Batata>("https://localhost:7297/api/salvarbatata/" + batata.id, batata)
            .subscribe(
              next => console.log("Resposta do servidor: " + next),
              error => console.log(error)
            );
        }
      } else {
        console.log("Array de batatas vazio ou indefinido.");
      }
      //console.log("Fora do If");

    }, 10000);
  }

  maisBatata(){
    
    if(this.dataService.varUpg == false){
      this.qtdBatatasClick += 1;
    } else{
      this.dataService.variavelCompBatata += 1;
    }
    
  }

  somarBps(){

    this.dataService.variavelCompBatata += this.dataService.variavelCompBps;

  }

  envBatatas(){

    if(this.dataService.varUpg == false){
      this.dataService.variavelCompBatata = this.qtdBatatasClick;
    }

  }
}
