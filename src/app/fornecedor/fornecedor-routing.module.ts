import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FornecedorPesquisaComponent } from './fornecedor-pesquisa/fornecedor-pesquisa.component';
import { FornecedorCadastroComponent } from './fornecedor-cadastro/fornecedor-cadastro.component';

const routes: Routes = [
  { path: 'fornecedores', component: FornecedorPesquisaComponent },
  { path: 'fornecedores/novo', component: FornecedorCadastroComponent },
  { path: 'fornecedores/:codigo', component: FornecedorCadastroComponent },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FornecedorRoutingModule { }
