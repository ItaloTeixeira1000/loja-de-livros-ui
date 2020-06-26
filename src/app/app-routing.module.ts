import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LivrosPesquisaComponent } from './livro/livros-pesquisa/livros-pesquisa.component';
import { LivroCadastroComponent } from './livro/livro-cadastro/livro-cadastro.component';
import { FornecedorPesquisaComponent } from './fornecedor/fornecedor-pesquisa/fornecedor-pesquisa.component';
import { FornecedorCadastroComponent } from './fornecedor/fornecedor-cadastro/fornecedor-cadastro.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';

const routes: Routes = [
  { path: '', redirectTo: 'livros', pathMatch: 'full' },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({

  imports: [
    RouterModule.forRoot(routes),

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
