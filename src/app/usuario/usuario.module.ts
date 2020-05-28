import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { InputMaskModule } from 'primeng/inputmask';

import { UsuarioPesquisaComponent } from './usuario-pesquisa/usuario-pesquisa.component';
import { UsuarioGridComponent } from './usuario-grid/usuario-grid.component';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';




@NgModule({
  declarations: [
    UsuarioCadastroComponent,
    UsuarioGridComponent,
    UsuarioPesquisaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputMaskModule,

    SharedModule
  ],
  exports: [
    UsuarioCadastroComponent,
    UsuarioPesquisaComponent
  ]
})
export class UsuarioModule { }
