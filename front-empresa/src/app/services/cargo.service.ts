import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cargo } from '../models/cargo';
import { MatSnackBar } from "@angular/material/snack-bar";
@Injectable({
  providedIn: 'root',
})
export class CargoService {
  baseUrl: String = 'https://backend-empresa-deploy.herokuapp.com/empresa';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  buscarTodos(): Observable<Cargo[]> {
    const url = `${this.baseUrl}/cargo`;
    return this.http.get<Cargo[]>(url);
  }

  buscarUm(id: string): Observable<Cargo> {
    const url = `${this.baseUrl}/cargo/${id}`;
    return this.http.get<Cargo>(url);
  }

  cadastrarTurma(cargo: Cargo): Observable<Cargo> {
    const url = `${this.baseUrl}/cargo`;
    return this.http.post<Cargo>(url, cargo);
  }

  deletarCargo(id: string): Observable<void> {
    const url = `${this.baseUrl}/cargo/${id}`;
    return this.http.delete<void>(url);
  }

  editarCargo(cargo: Cargo): Observable<Cargo> {
    const url = `${this.baseUrl}/cargo/${cargo.id_cargo}
    `;
    return this.http.put<Cargo>(url, cargo);
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
