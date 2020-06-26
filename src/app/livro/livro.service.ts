import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import * as moment from 'moment';

import { Livro } from '../core/model';

export class LivroFiltro {
  titulo: string;
  dataPub: Date;
  descricao: string;
  autor: string;
  preco: number;
  pagina = 0;
  itensPorPagina = 2;
}

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  constructor(private http: HttpClient) {}

  livrosUrl = 'http://localhost:8080/livros';

  pesquisar(filtro: LivroFiltro): Promise<any> {
    let params = new HttpParams();
    const headers = new HttpHeaders().append(
      'Authorization',
      'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    );

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.titulo) {
      params = params.set('titulo', filtro.titulo);
    }

    if (filtro.dataPub) {
      params = params.set(
        'dataPublicacao',
        moment(filtro.dataPub).format('YYYY-MM-DD')
      );
    }

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.autor) {
      params = params.set('autor', filtro.autor);
    }

    if (filtro.preco) {
      params = params.set('preco', filtro.preco.toString());
    }

    return this.http
      .get(`${this.livrosUrl}`, { headers, params })
      .toPromise()
      .then((response) => {
        const responseJson = JSON.parse(JSON.stringify(response));
        const livros = responseJson.content;

        const resultado = {
          livros,
          total: responseJson.totalElements,
        };
        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {
    const headers = new HttpHeaders().append(
      'Authorization',
      'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    );

    return this.http
      .delete(`${this.livrosUrl}/${codigo}`, { headers })
      .toPromise()
      .then(() => null);
  }

  adicionar(livro: Livro): Promise<Livro> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

    return this.http
      .post(this.livrosUrl, JSON.stringify(livro), { headers })
      .toPromise()
      .then((response) => JSON.parse(JSON.stringify(response)));
  }

  atualizar(livro: Livro): Promise<Livro> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

    return this.http
      .put(`${this.livrosUrl}/${livro.codigo}`, JSON.stringify(livro), {
        headers,
      })
      .toPromise()
      .then(response => {
        const livroAlterado = JSON.parse(JSON.stringify(response)) as Livro;

        this.converterStringParaDatas([livroAlterado]);

        return livroAlterado;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Livro> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http
      .get(`${this.livrosUrl}/${codigo}`, { headers })
      .toPromise()
      .then((response) => {
        const livro = JSON.parse(JSON.stringify(response)) as Livro;

        this.converterStringParaDatas([livro]);
        return livro;
      });
  }

  private converterStringParaDatas(livros: Livro[]) {
    for (const livro of livros) {
      if (livro.dataPublicacao) {
        livro.dataPublicacao = moment(
          livro.dataPublicacao,
          'YYYY-MM-DD'
        ).toDate();
      }
    }
  }
}
