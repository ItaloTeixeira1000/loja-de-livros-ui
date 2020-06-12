import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TableModule} from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { TooltipModule } from 'primeng/tooltip';

import { FornecedorPesquisaComponent } from './fornecedor-pesquisa/fornecedor-pesquisa.component';

@NgModule({
  declarations: [
    FornecedorPesquisaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    DropdownModule,
    MessageModule,
  ],
  exports: [
    FornecedorPesquisaComponent
  ]
})
export class FornecedorModule { }
