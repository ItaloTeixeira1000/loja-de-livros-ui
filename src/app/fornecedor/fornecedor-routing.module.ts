import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FornecedorPesquisaComponent } from './fornecedor-pesquisa/fornecedor-pesquisa.component';
import { FornecedorCadastroComponent } from './fornecedor-cadastro/fornecedor-cadastro.component';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
  {
    path: 'fornecedores',
    component: FornecedorPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_FORNECEDOR'] }
  },
  {
    path: 'fornecedores/novo',
    component: FornecedorCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_FORNECEDOR'] }
  },
  {
    path: 'fornecedores/:codigo',
    component: FornecedorCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_FORNECEDOR'] }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FornecedorRoutingModule {}
