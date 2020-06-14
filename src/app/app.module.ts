import { FornecedorService } from './fornecedor/fornecedor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { UsuarioModule } from './usuario/usuario.module';
import { LivroModule } from './livro/livro.module';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import {registerLocaleData} from '@angular/common';
import br from '@angular/common/locales/br';

registerLocaleData(br, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    FornecedorModule,
    LivroModule,
    UsuarioModule,
    CoreModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
