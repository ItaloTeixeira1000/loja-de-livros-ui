import { Component, OnInit, ViewChild } from '@angular/core';

import { SelectItem } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/api/public_api';
import { ConfirmationService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

import { FornecedorService, FornecedorFiltro } from './../fornecedor.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-fornecedor-pesquisa',
  templateUrl: './fornecedor-pesquisa.component.html',
  styleUrls: ['./fornecedor-pesquisa.component.css'],
})
export class FornecedorPesquisaComponent implements OnInit {
  ativo: SelectItem[];
  @ViewChild('tabela', { static: false }) grid;

  totalRegistros = 0;
  filtro = new FornecedorFiltro();
  fornecedores = [];

  constructor(
    private fornecedorService: FornecedorService,
    private toastr: ToastrService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService
  ) {
    this.ativo = [
      { label: 'Selecione o status', value: '' },
      { label: 'Inativo', value: '0' },
      { label: 'Ativo', value: '1' },
    ];
  }

  ngOnInit() {}

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.fornecedorService
      .pesquisar(this.filtro)
      .then((resultado) => {
        this.totalRegistros = resultado.total;
        this.fornecedores = resultado.fornecedores;
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  confirmarExclusao(fornecedor: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(fornecedor);
      },
    });
  }

  excluir(fornecedor: any) {
    this.fornecedorService
      .excluir(fornecedor.codigo)
      .then(() => {
        this.grid.first = 0;
        this.pesquisar();
        this.toastr.success('Fornecedor excluído com sucesso!');
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  mudarStatus(codigo: number, status: boolean) {
    this.fornecedorService
      .mudarStatus(codigo, !status)
      .then(() => {
        this.grid.first = 0;
        this.pesquisar();
        if (!status) {
          this.toastr.success('Fornecedor ativado com sucesso!');
        } else {
          this.toastr.success('Fornecedor desativado com sucesso!');
        }
      })
      .catch((error) => this.errorHandler.handle(error));
  }
}
