import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClickerComponent } from './clicker/clicker.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpgComponent } from './upg/upg.component';

@NgModule({
  declarations: [
    AppComponent,
    ClickerComponent,
    UpgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
