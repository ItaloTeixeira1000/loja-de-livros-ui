import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import * as moment from 'moment';

import { Livro } from '../core/model';
import { AuthService } from '../seguranca/auth.service';
import { environment } from 'src/environments/environment';

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

  livrosUrl: string;

  constructor(public http: HttpClient, private auth: AuthService) {
    this.livrosUrl = `${environment.apiUrl}/livros`;
  }


  pesquisar(filtro: LivroFiltro): Promise<any> {
    let params = new HttpParams();

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
      .get(`${this.livrosUrl}`, { params })
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
    return this.http
      .delete(`${this.livrosUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(livro: Livro): Promise<Livro> {
    return this.http
      .post(this.livrosUrl, JSON.stringify(livro))
      .toPromise()
      .then((response) => JSON.parse(JSON.stringify(response)));
  }

  atualizar(livro: Livro): Promise<Livro> {
    return this.http
      .put(`${this.livrosUrl}/${livro.codigo}`, JSON.stringify(livro))
      .toPromise()
      .then((response) => {
        const livroAlterado = JSON.parse(JSON.stringify(response)) as Livro;

        this.converterStringParaDatas([livroAlterado]);

        return livroAlterado;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Livro> {
    return this.http
      .get(`${this.livrosUrl}/${codigo}`)
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

  atualizarToken() {
    if (this.auth.isAccessTokenInvalido()) {
      this.auth.obterNovoAccessToken();
    }
  }
}
