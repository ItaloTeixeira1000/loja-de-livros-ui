import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export interface LivroFiltro {
  titulo: string;
}

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  constructor(private http: HttpClient) { }

  livrosUrl = 'http://localhost:8080/livros';

  pesquisar(filtro: LivroFiltro): Promise<any> {
    const params = new HttpParams();
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    if (filtro.titulo) {
      params.append('titulo', filtro.titulo);
    }

    return this.http.get(`${this.livrosUrl}`,
      {headers, params} )
      .toPromise()
      .then(response => response);
  }
}
