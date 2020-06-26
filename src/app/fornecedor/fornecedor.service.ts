import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Fornecedor } from '../core/model';

export class FornecedorFiltro {
  nomeFantasma: string;
  razaoSocial: string;
  cnpj: string;
  inscricaoEstadual: string;
  ativo: string;
  pagina = 0;
  itensPorPagina = 2;
}

@Injectable({
  providedIn: 'root',
})
export class FornecedorService {
  constructor(private http: HttpClient) {}

  fornecedorUrl = 'http://localhost:8080/fornecedores';
  pesquisar(filtro: FornecedorFiltro): Promise<any> {
    const headers = new HttpHeaders().append(
      'Authorization',
      'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    );
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nomeFantasma) {
      params = params.set('nomeFantasma', filtro.nomeFantasma);
    }

    if (filtro.razaoSocial) {
      params = params.set('razaoSocial', filtro.razaoSocial);
    }

    if (filtro.cnpj) {
      params = params.set('cnpj', filtro.cnpj);
    }

    if (filtro.inscricaoEstadual) {
      params = params.set('inscricaoEstadual', filtro.inscricaoEstadual);
    }

    console.log(filtro.ativo);
    if (filtro.ativo) {
      params = params.set('ativo', filtro.ativo);
    }

    return this.http
      .get(`${this.fornecedorUrl}`, { headers, params })
      .toPromise()
      .then((response) => {
        const responseJson = JSON.parse(JSON.stringify(response));
        const fornecedores = responseJson.content;

        const resultado = {
          fornecedores,
          total: responseJson.totalElements,
        };
        return resultado;
      });
  }

  excluir(codigo: any): Promise<void> {
    const headers = new HttpHeaders().append(
      'Authorization',
      'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    );

    return this.http
      .delete(`${this.fornecedorUrl}/${codigo}`, { headers })
      .toPromise()
      .then(() => null);
  }

  mudarStatus(codigo: number, status: boolean): Promise<void> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');
    return this.http
      .put(`${this.fornecedorUrl}/${codigo}/ativo`, status, { headers })
      .toPromise()
      .then(() => null);
  }

  listarTodosFornecedores(): Promise<any> {
    const headers = new HttpHeaders().append(
      'Authorization',
      'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    );

    return this.http
      .get(`${this.fornecedorUrl}`, { headers })
      .toPromise()
      .then((response) => response);
  }

  adicionar(fornecedor: Fornecedor): Promise<Fornecedor> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

    return this.http
      .post(this.fornecedorUrl, JSON.stringify(fornecedor), { headers })
      .toPromise()
      .then((response) => JSON.parse(JSON.stringify(response)));
  }

  atualizar(fornecedor: Fornecedor): Promise<Fornecedor> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

    return this.http.put(
      `${this.fornecedorUrl}/${fornecedor.codigo}`,
      JSON.stringify(fornecedor),
      { headers }
    )
    .toPromise()
    .then(response => JSON.parse(JSON.stringify(response)) as Fornecedor);
  }

  buscarPorCodigo(codigo: number): Promise<Fornecedor> {
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(`${this.fornecedorUrl}/${codigo}`, { headers })
      .toPromise()
      .then(response => JSON.parse(JSON.stringify(response)) as Fornecedor);
  }
}
