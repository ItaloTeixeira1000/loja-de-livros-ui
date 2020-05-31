import { Component, OnInit } from '@angular/core';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livros-pesquisa',
  templateUrl: './livros-pesquisa.component.html',
  styleUrls: ['./livros-pesquisa.component.css']
})
export class LivrosPesquisaComponent implements OnInit{

  titulo: string;
  lancamentos = [];

  constructor(private livroService: LivroService){}

  ngOnInit() {
    this.pesquisar();
  }
  pesquisar() {
    this.livroService.pesquisar({ titulo: this.titulo})
      .then((livros) => this.lancamentos = livros.content );
  }

}
