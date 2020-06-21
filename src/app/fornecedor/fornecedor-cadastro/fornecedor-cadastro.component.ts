import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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
    private handleService: ErrorHandlerService
  ) {
    this.ativo = [
      { label: 'Selecione o status', value: '' },
      { label: 'Inativo', value: false },
      { label: 'Ativo', value: true },
    ];
  }

  ngOnInit(): void {}

  salvar(form: NgForm) {
    this.fornecedorService.adicionar(this.fornecedor)
      .then(() => {
        this.toasty.success('Fornecedor adicionado com sucesso');

        form.reset();
        this.fornecedor = new Fornecedor();
      })
      .catch(erro => this.handleService.handle(erro));
  }
}
