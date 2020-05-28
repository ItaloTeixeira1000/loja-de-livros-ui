import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-usuario-grid',
  templateUrl: './usuario-grid.component.html',
  styleUrls: ['./usuario-grid.component.css']
})
export class UsuarioGridComponent {

  @Input() usuarios = [];

}
