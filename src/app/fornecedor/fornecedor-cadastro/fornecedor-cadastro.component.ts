import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SelectItem } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

import { Fornecedor } from 'src/app/core/model';
import { FornecedorService } from '../fornecedor.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-fornecedor-cadastro',
  templateUrl: './fornecedor-cadastro.component.html',
  styleUrls: ['./fornecedor-cadastro.component.css'],
})
export class FornecedorCadastroComponent implements OnInit {

  ativo: SelectItem[];
  fornecedor = new Fornecedor();

  constructor(
    private fornecedorService: FornecedorService,
    private toasty: ToastrService,
    private handleService: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.ativo = [
      { label: 'Selecione o status', value: '' },
      { label: 'Inativo', value: false },
      { label: 'Ativo', value: true },
    ];
  }

  ngOnInit(): void {
    const fornecedorCodigo = this.route.snapshot.params['codigo'];

    if (fornecedorCodigo) {
      this.carregarFornecedor(fornecedorCodigo);
    }
  }

  get editando() {
    return Boolean(this.fornecedor.codigo);
  }

  carregarFornecedor(codigo: number) {
    this.fornecedorService.buscarPorCodigo(codigo)
      .then(fornecedor => {
        this.fornecedor = fornecedor;
      })
      .catch(erro => this.handleService.handle(erro));
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarFornecedor(form);
    } else {
      this.adicionarFornecedor(form);
    }
  }


  adicionarFornecedor(form: NgForm) {
    this.fornecedorService.adicionar(this.fornecedor)
      .then((fornecedorAdicionado) => {
        this.toasty.success('Fornecedor adicionado com sucesso');

        // form.reset();
        // this.fornecedor = new Fornecedor();

        this.router.navigate(['/fornecedores', fornecedorAdicionado.codigo]);
      })
      .catch(erro => this.handleService.handle(erro));
  }

  atualizarFornecedor(form: NgForm) {
    this.fornecedorService.atualizar(this.fornecedor)
      .then(fornecedor => {
        this.fornecedor = fornecedor;

        this.toasty.success('Fornecedor alterado com sucesso!');
      })
      .catch(erro => this.handleService.handle(erro));
  }

  novo(form: NgForm) {
    form.reset();

    setTimeout(function() {
      this.fornecedor = new Fornecedor();
    }.bind(this), 1);

    this.router.navigate(['/fornecedores/novo']);
  }
}
