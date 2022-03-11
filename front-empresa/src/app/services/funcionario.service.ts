import { Observable } from 'rxjs';
import { Funcionario } from './../models/funcionario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar"

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  baseUrl: String = 'http://localhost:8080/empresa';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  buscarFunCargo(id_cargo: string): Observable<Funcionario[]> {
    const url = `${this.baseUrl}/funcionario/buscar-cargo/${id_cargo}`;
    return this.http.get<Funcionario[]>(url);
  }

  buscarUmfunCargo(id_func: string):Observable<Funcionario>{
    const url = `${this.baseUrl}/funcionario/${id_func}`;
    return this.http.get<Funcionario>(url);
  }

  cadastrarFun(funcionario:Funcionario, id_cargo: string): Observable<Funcionario> {
    const url = `${this.baseUrl}/funcionario?cargo=${id_cargo}`;
    return this.http.post<Funcionario>(url, funcionario);
  }

  deletarFun(id_func: string): Observable<Funcionario> {
    const url = `${this.baseUrl}/funcionario/${id_func}`;
    return this.http.delete<Funcionario>(url);
  }

  editarFun(id_func:string, id_cargo:string, funcionario:Funcionario):Observable<Funcionario>{
    const url = `${this.baseUrl}/funcionario/${id_func}?cargo=${id_cargo}`;
    return this.http.put<Funcionario>(url, funcionario)
  }
  // http://localhost:8080/empresa/funcionario/4?cargo=2

  buscarPeloCpf(func_cpf:string):Observable<Funcionario>{
    const url = `${this.baseUrl}/funcionario-cpf/${func_cpf}`;
    return this.http.get<Funcionario>(url);
  }

  mensagem(msg: string): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: ['cor-mensagem']
    })
  }//
}
