import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as moment from 'moment';

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
  providedIn: 'root'
})
export class LivroService {

  constructor(
    private http: HttpClient
  ) { }

  livrosUrl = 'http://localhost:8080/livros';

  pesquisar(filtro: LivroFiltro): Promise<any> {
    let params = new HttpParams();
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.titulo) {
      params = params.set('titulo', filtro.titulo);
    }

    if (filtro.dataPub) {
      params = params.set('dataPub',
        moment(filtro.dataPub).format('YYYY-MM-DD'));
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

    return this.http.get(`${this.livrosUrl}`,
      {headers, params} )
      .toPromise()
      .then(response => {
        const responseJson = JSON.parse(JSON.stringify(response));
        const livros = responseJson.content;

        const resultado = {
          livros,
          total: responseJson.totalElements
        };
        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete(`${this.livrosUrl}/${codigo}`, {headers})
      .toPromise()
      .then(() => null);
  }
}
