import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {

  static REPO_CLIENTES = "_CLIENTES";
  private storage: Storage = localStorage

  constructor() {}

  atualizar(clienteAtualizado: Cliente) {
    const clientes = this.obterStorage()
    clientes.forEach(c => {
      if (c.id === clienteAtualizado.id) {
        Object.assign(c, clienteAtualizado)
      }
    })
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes))
  }

  salvar(cliente: Cliente) {
    const clientes = this.obterStorage()
    clientes.push(cliente)
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes))
  }

  excluir(clienteExcluido: Cliente) {
    const clientes = this.obterStorage()
    const novosClientes = clientes.filter(c => c.id !== clienteExcluido.id)
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(novosClientes))
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

  buscarClientePorId(id: string): Cliente | undefined {
    const clientes = this.obterStorage()
    const cliente = clientes.find(cliente => cliente.id === id)

    return cliente
  }

}
