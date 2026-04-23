import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {

  static REPO_CLIENTES = "_CLIENTES";
  private storage: Storage = localStorage

  constructor() {}

  salvar(cliente: Cliente) {
    const clientes = this.obterStorage()
    clientes.push(cliente)
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes))
  }

  pesquisarClientes(nome: string): Cliente[] {
    const clientes = this.obterStorage()
    if (!nome) {
      return clientes
    }

    return clientes.filter(cliente => cliente.nome?.toLowerCase().includes(nome.toLowerCase()))
  }

  private obterStorage(): Cliente[] {
    const repositorioClientes = this.storage.getItem(ClienteService.REPO_CLIENTES)
    if (repositorioClientes) {
      const clientes: Cliente[] = JSON.parse(repositorioClientes)
      return clientes
    }
    
    const clientes: Cliente[] = [];
    this.storage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes))
    return clientes
  }
}
