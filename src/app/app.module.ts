import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
/* Material */
import { MatDialogModule } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from './components/confirmation-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule} from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';

//Importar httpclient para servicios
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConProdGenComponent } from './components/con-prod-gen.component'; 
import { ProdGenComponent } from './components/prod-gen.component';
import { dlg_producto } from './components/prod-ge-dialog.component'; 
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    ConProdGenComponent,
    ProdGenComponent,
    dlg_producto,
    DialogoConfirmacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    FormsModule,
    NoopAnimationsModule,
    MatDialogModule,
    MatRadioModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogoConfirmacionComponent
  ]
})
export class AppModule { }
