import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { encode, decode } from 'node-base64-image';
import { ReceitaService } from './receita.service';
import { LoginPipe } from './login.pipe';
import { jsPDF } from 'jspdf';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import {IonicInputMaskModule} from "@thiagoprz/ionic-input-mask";

@NgModule({
  declarations: [AppComponent, LoginPipe],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IonicInputMaskModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ReceitaService,
    PDFGenerator,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
