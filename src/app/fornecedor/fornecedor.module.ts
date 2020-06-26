import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {TableModule} from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { TooltipModule } from 'primeng/tooltip';

import { FornecedorPesquisaComponent } from './fornecedor-pesquisa/fornecedor-pesquisa.component';
import { FornecedorCadastroComponent } from './fornecedor-cadastro/fornecedor-cadastro.component';
import { FornecedorRoutingModule } from './fornecedor-routing.module';

@NgModule({
  declarations: [
    FornecedorPesquisaComponent,
    FornecedorCadastroComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    DropdownModule,
    MessageModule,
    FornecedorRoutingModule
  ],
  exports: []
})
export class FornecedorModule { }
