import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-fornecedor-pesquisa',
  templateUrl: './fornecedor-pesquisa.component.html',
  styleUrls: ['./fornecedor-pesquisa.component.css']
})
export class FornecedorPesquisaComponent {

  ativo: SelectItem[];
  selectedAtivo: any;

  fornecedores = [
    {nome: 'MV', razao: 'Software', cnpj: '12343', inscricao: '0000', status: true},
    {nome: 'Fluxus', razao: 'Software', cnpj: '12343', inscricao: '0000', status: false}
  ];

  constructor() {
    this.ativo = [
      {label: 'Selecione o status', value: 0},
      {label: 'Inativo', value: 1},
      {label: 'Ativo', value: 2}
    ];
  }




  }
