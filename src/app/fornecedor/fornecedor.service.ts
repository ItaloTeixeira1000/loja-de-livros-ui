import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class FornecedorFiltro {
  nomeFantasma: string;
  razaoSocial: string;
  cnpj: string;
  inscricaoEstadual: string;
  pagina = 0;
  itensPorPagina = 2;
}

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  constructor(private http: HttpClient) { }

  fornecedorUrl = 'http://localhost:8080/fornecedores';
  pesquisar(filtro: FornecedorFiltro): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
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

    return this.http.get(`${this.fornecedorUrl}`,
      {headers, params})
      .toPromise()
      .then(response => {
        const responseJson = JSON.parse(JSON.stringify(response));
        const fornecedores = responseJson.content;

        const resultado = {
          fornecedores,
          total: responseJson.totalElements
        };
        return resultado;
      });
  }
}
