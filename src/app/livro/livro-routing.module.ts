import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LivrosPesquisaComponent } from './livros-pesquisa/livros-pesquisa.component';
import { LivroCadastroComponent } from './livro-cadastro/livro-cadastro.component';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
  {
    path: 'livros',
    component: LivrosPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_LIVRO'] }
  },
  {
    path: 'livros/novo',
    component: LivroCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_LIVRO'] }
  },
  {
    path: 'livros/:codigo',
    component: LivroCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_LIVRO'] }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivroRoutingModule {}
