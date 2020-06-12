import { LivroFiltro } from './../livro.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LivroService } from '../livro.service';
import { LazyLoadEvent } from 'primeng/api/public_api';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-livros-pesquisa',
  templateUrl: './livros-pesquisa.component.html',
  styleUrls: ['./livros-pesquisa.component.css']
})
export class LivrosPesquisaComponent implements OnInit{

  totalRegistros = 0;
  filtro = new LivroFiltro();
  lancamentos = [];
  @ViewChild('tabela', { static: false }) grid;

  constructor(
    private livroService: LivroService,
    private toastr: ToastrService

    ){}

  ngOnInit() {

  }
  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;

    this.livroService.pesquisar(this.filtro)
      .then((resultado) => {
        this.totalRegistros = resultado.total;
        this.lancamentos = resultado.livros;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  excluir(livro: any) {
    this.livroService.excluir(livro.codigo)
      .then(() => {
        this.grid.first = 0;
        this.pesquisar();
        this.toastr.success('Livro excluído com sucesso!');

      });
  }

}
