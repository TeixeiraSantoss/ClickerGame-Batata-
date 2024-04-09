import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClickerComponent } from './clicker/clicker.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpgComponent } from './upg/upg.component';
import { BpsComponent } from './bps/bps.component';

@NgModule({
  declarations: [
    AppComponent,
    ClickerComponent,
    UpgComponent,
    BpsComponent
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
