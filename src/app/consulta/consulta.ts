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

@Component({
  selector: 'app-consulta',
  imports: [MatInputModule, MatCardModule, MatTableModule, MatIconModule, FlexLayoutModule, FormsModule, CommonModule, MatButtonModule],
  templateUrl: './consulta.html',
  styleUrl: './consulta.scss',
})
export class Consulta implements OnInit {

  listaClientes: Cliente[] = []
  colunasTable: string[] = ['id', 'nome', 'email', 'cpf', 'dataNascimento']

  constructor(private service: ClienteService) {}

  ngOnInit() {
    this.listaClientes = this.service.pesquisarClientes("")
  }
}
