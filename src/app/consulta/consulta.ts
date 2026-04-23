import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { ClienteService } from '../cliente';
import { Cliente } from '../cadastro/cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  imports: [MatInputModule, MatCardModule, MatTableModule, MatIconModule, FlexLayoutModule, FormsModule, CommonModule, MatButtonModule],
  templateUrl: './consulta.html',
  styleUrl: './consulta.scss',
})
export class Consulta implements OnInit {

  nomeBusca: string = ""
  listaClientes: Cliente[] = []
  colunasTable: string[] = ['id', 'nome', 'email', 'cpf', 'dataNascimento', "uf", "municipio", 'acoes']

  constructor(
    private service: ClienteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.listaClientes = this.service.pesquisarClientes("")
  }

  pesquisar() {
    this.listaClientes = this.service.pesquisarClientes(this.nomeBusca)
  }

  preparaEditar(id: string) {
    this.router.navigate(['/cadastro'], { queryParams: {"id": id }})
  }

  preparaDeletar(cliente: Cliente) {
    cliente.deletando = true
  }

  deletar(cliente: Cliente) {
    this.service.excluir(cliente)
    this.pesquisar()
  }
}
