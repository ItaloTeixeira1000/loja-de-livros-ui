import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-fornecedor-grid',
  templateUrl: './fornecedor-grid.component.html',
  styleUrls: ['./fornecedor-grid.component.css']
})
export class FornecedorGridComponent {

    @Input() fornecedores = [];

}
