import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { GrillaComponent } from './componentes/grilla/grilla.component';

@NgModule({
  declarations: [
    AppComponent,
    GrillaComponent
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
