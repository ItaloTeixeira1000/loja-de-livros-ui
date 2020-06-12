import { FornecedorService, FornecedorFiltro } from './../fornecedor.service';
import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';
import { LazyLoadEvent } from 'primeng/api/public_api';

@Component({
  selector: 'app-fornecedor-pesquisa',
  templateUrl: './fornecedor-pesquisa.component.html',
  styleUrls: ['./fornecedor-pesquisa.component.css']
})
export class FornecedorPesquisaComponent implements OnInit {

  ativo: SelectItem[];
  selectedAtivo: any;

  totalRegistros = 0;
  filtro = new FornecedorFiltro();
  fornecedores = [];

  constructor(private fornecedorService: FornecedorService) {
    this.ativo = [
      {label: 'Selecione o status', value: 0},
      {label: 'Inativo', value: 1},
      {label: 'Ativo', value: 2}
    ];
  }

  ngOnInit() {

  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;

    this.fornecedorService.pesquisar(this.filtro)
      .then((resultado) => {
        this.totalRegistros = resultado.total;
        this.fornecedores = resultado.fornecedores;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
    console.log(event);
  }

  }
