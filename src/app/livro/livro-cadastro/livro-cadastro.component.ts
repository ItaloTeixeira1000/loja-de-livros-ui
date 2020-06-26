import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ToastrService } from 'ngx-toastr';

import { FornecedorService } from 'src/app/fornecedor/fornecedor.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { LivroService } from '../livro.service';
import { Livro } from 'src/app/core/model';

@Component({
  selector: 'app-livro-cadastro',
  templateUrl: './livro-cadastro.component.html',
  styleUrls: ['./livro-cadastro.component.css'],
})
export class LivroCadastroComponent implements OnInit {
  fornecedores = [];
  livro = new Livro();

  constructor(
    private fornecedorService: FornecedorService,
    private livroService: LivroService,
    private toasty: ToastrService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit(): void {
    const codigoLivro = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo livro');

    if (codigoLivro) {
      this.carregarLivro(codigoLivro);
    }

    this.carregarFornecedor();
  }

  get editando() {
    return Boolean(this.livro.codigo);
  }

  carregarLivro(codigo: number) {
    this.livroService
      .buscarPorCodigo(codigo)
      .then((livro) => {
        this.livro = livro;
        this.atualizarTitiloEdicao();
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarLivro(form);
    } else {
      this.adicionarLivro(form);
    }
  }

  adicionarLivro(form: NgForm) {
    this.livroService
      .adicionar(this.livro)
      .then((livroAdicionado) => {
        this.toasty.success('Livro adicionado com sucesso');

        // form.reset();
        // this.livro = new Livro();
        this.router.navigate(['/livros', livroAdicionado.codigo]);
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  atualizarLivro(form: NgForm) {
    this.livroService
      .atualizar(this.livro)
      .then((livro) => {
        this.livro = livro;

        this.toasty.success('Livro alterado com sucesso!');
        this.atualizarTitiloEdicao();
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  carregarFornecedor() {
    this.fornecedorService
      .listarTodosFornecedores()
      .then((fornecedores) => {
        this.fornecedores = fornecedores.content.map((f) => ({
          label: f.nomeFantasma,
          value: f.codigo,
        }));
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
      });
  }

  novo(form: NgForm) {
    form.reset();

    setTimeout(function() {
      this.livro = new Livro();
    }.bind(this), 1);

    this.router.navigate(['/livros/novo']);
  }

  atualizarTitiloEdicao() {
    this.title.setTitle(`Edição de livro: ${this.livro.titulo}`);
  }
}
