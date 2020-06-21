import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.carregarFornecedor();
  }

  salvar(form: NgForm) {
    this.livroService.adicionar(this.livro)
      .then(() => {
        this.toasty.success('Livro adicionado com sucesso');

        form.reset();
        this.livro = new Livro();
      })
      .catch(erro => this.errorHandler.handle(erro));
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
}
