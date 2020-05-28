import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario-pesquisa',
  templateUrl: './usuario-pesquisa.component.html',
  styleUrls: ['./usuario-pesquisa.component.css']
})
export class UsuarioPesquisaComponent {

  usuarios = [
    {codigo: 1, nome: 'Admin', email: 'admin@algamoney.com'}
  ];

}
