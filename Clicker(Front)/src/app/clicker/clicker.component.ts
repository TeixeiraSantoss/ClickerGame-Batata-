import { Component } from '@angular/core';
import { DataServiceService } from '../service/data-service.service';
import { repeat } from 'rxjs';

@Component({
  selector: 'app-clicker',
  templateUrl: './clicker.component.html',
  styleUrls: ['./clicker.component.css']
})
export class ClickerComponent {

  constructor(public dataService: DataServiceService){}

  qtdBatatasClick: number = 0;
  qtdBatatasBps: number = 0;
  totalBatatas: number = 0;

  ngOnInit(): void {
    // Inicia a execução da função constantemente
    setInterval(() => {
      this.somarBps();
    }, 1000); // Define um intervalo de 1000 milissegundos (1 segundo)
  }

  maisBatata(){
    if(this.dataService.varUpg == false){
      this.qtdBatatasClick += 1;
    } else{
      this.dataService.variavelCompBatata += 1;
    }

    console.log("qtdBatatasClick: " + this.qtdBatatasClick)
    console.log("dataService: " + this.dataService.variavelCompBatata)
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
