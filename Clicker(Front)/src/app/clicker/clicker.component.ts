import { Component } from '@angular/core';

@Component({
  selector: 'app-clicker',
  templateUrl: './clicker.component.html',
  styleUrls: ['./clicker.component.css']
})
export class ClickerComponent {
  qtdBatatas: number = 0;

  maisBatata(){
    this.qtdBatatas += 1;
  }
}
