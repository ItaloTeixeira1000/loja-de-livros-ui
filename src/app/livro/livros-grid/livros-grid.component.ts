import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-livros-grid',
  templateUrl: './livros-grid.component.html',
  styleUrls: ['./livros-grid.component.css']
})
export class LivrosGridComponent {

  @Input() lancamentos = [];

}
