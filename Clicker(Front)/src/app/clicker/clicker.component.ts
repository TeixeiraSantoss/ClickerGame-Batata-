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

  qtdBatatas: number = 0;

  ngOnInit(): void {
    console.log("ola");
    console.log(this.dataService.variavelCompartilhada);
    // Inicia a execução da função constantemente
    setInterval(() => {
      this.somarBps();
    }, 1000); // Define um intervalo de 1000 milissegundos (1 segundo)
  }

  maisBatata(){
    this.qtdBatatas += 1;
  }

  somarBps(){
    this.qtdBatatas += this.dataService.variavelCompartilhada;
  }
}
