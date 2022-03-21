
import { CadastrarCargoComponent } from './components/cadastrar-cargo/cadastrar-cargo.component';
import { ListarCargosComponent } from './components/listar-cargos/listar-cargos.component';
import { HomeComponent } from './templates/home/home.component';
import { FooterComponent } from './templates/footer/footer.component';
import { HeaderComponent } from './templates/header/header.component';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/pt'
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CardsFunComponent } from './components/cards-fun/cards-fun.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AgendaFuncComponent } from './components/agenda-func/agenda-func.component';
import {MatTooltipModule} from '@angular/material/tooltip';

registerLocaleData(locale)

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ListarCargosComponent,
    CadastrarCargoComponent,
    CardsFunComponent,
    AgendaFuncComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    NgbModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatDatepickerModule,
    CarouselModule,
    MatTooltipModule


  ],
  providers: [{ provide: LOCALE_ID, useValue: "pt-BR" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
