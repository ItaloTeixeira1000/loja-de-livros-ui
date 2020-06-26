import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LivrosPesquisaComponent } from './livros-pesquisa/livros-pesquisa.component';
import { LivroCadastroComponent } from './livro-cadastro/livro-cadastro.component';

const routes: Routes = [
  { path: 'livros', component: LivrosPesquisaComponent },
  { path: 'livros/novo', component: LivroCadastroComponent },
  { path: 'livros/:codigo', component: LivroCadastroComponent }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LivroRoutingModule { }
