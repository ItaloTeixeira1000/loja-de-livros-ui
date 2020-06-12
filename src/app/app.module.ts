import { FornecedorService } from './fornecedor/fornecedor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { ToastrModule } from 'ngx-toastr';

import { UsuarioModule } from './usuario/usuario.module';
import { LivroModule } from './livro/livro.module';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LivroService } from './livro/livro.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    ToastrModule.forRoot(),

    FornecedorModule,
    LivroModule,
    UsuarioModule,
    CoreModule

  ],
  providers: [LivroService, FornecedorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
