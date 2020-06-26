import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LazyLoadEvent } from 'primeng/api/public_api';
import { ConfirmationService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

import { LivroService } from '../livro.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { LivroFiltro } from './../livro.service';

@Component({
  selector: 'app-livros-pesquisa',
  templateUrl: './livros-pesquisa.component.html',
  styleUrls: ['./livros-pesquisa.component.css'],
})
export class LivrosPesquisaComponent implements OnInit {
  totalRegistros = 0;
  filtro = new LivroFiltro();
  lancamentos = [];
  @ViewChild('tabela', { static: false }) grid;

  constructor(
    private livroService: LivroService,
    private errorHandler: ErrorHandlerService,
    private toastr: ToastrService,
    private confirmation: ConfirmationService,
    private title: Title
  ) {}

  ngOnInit() {
    this.title.setTitle('Pesquisa de livros');
  }
  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.livroService
      .pesquisar(this.filtro)
      .then((resultado) => {
        this.totalRegistros = resultado.total;
        this.lancamentos = resultado.livros;
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExlusao(livro: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(livro);
      },
    });
  }

  excluir(livro: any) {
    this.livroService
      .excluir(livro.codigo)
      .then(() => {
        this.grid.first = 0;
        this.pesquisar();
        this.toastr.success('Livro excluído com sucesso!');
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }
}
