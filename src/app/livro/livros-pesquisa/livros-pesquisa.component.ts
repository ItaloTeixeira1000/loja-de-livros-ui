import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-livros-pesquisa',
  templateUrl: './livros-pesquisa.component.html',
  styleUrls: ['./livros-pesquisa.component.css']
})
export class LivrosPesquisaComponent{
  lancamentos = [
    {tipo: 'DESPESA', descricao: 'Compra de pão', dataVencimento: new Date(2017, 6, 30),
      dataPagamento: null, valor: 4.55, pessoa: 'Padaria do José'},
    {tipo: 'RECEITA', descricao: 'Venda de software', dataVencimento: new Date(2017, 6, 10),
       dataPagamento: new Date(2017, 6, 9), valor: 4.55, pessoa: 'Atacado Brasil'},
    {tipo: 'DESPESA', descricao: 'Impostos', dataVencimento: new Date(2017, 7, 20),
       dataPagamento: null, valor: 4.55, pessoa: 'Ministério da Fazenda'},
    {tipo: 'DESPESA', descricao: 'Mensalidade de escola', dataVencimento: new Date(2017, 7, 5),
       dataPagamento: null, valor: 455, pessoa: 'Escola Abelha Rainha'},
    {tipo: 'RECEITA', descricao: 'Venda de carro', dataVencimento: new Date(2017, 8, 18),
       dataPagamento: new Date(2017, 5 , 30), valor: 55, pessoa: 'Sebastião Souza'},
    {tipo: 'DESPESA', descricao: 'Aluguel', dataVencimento: new Date(2017, 7, 10),
       dataPagamento: null, valor: 9.35, pessoa: 'Casa Imóveis'},
    {tipo: 'DESPESA', descricao: 'Mensalidade Musculação', dataVencimento: new Date(2017, 7, 13),
       dataPagamento: new Date(2017, 7, 9), valor: 4.55, pessoa: 'Academia'}
  ];

}
