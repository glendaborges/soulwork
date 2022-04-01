import { Compromisso } from './../models/compromisso';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CompromissoService {

  baseUrl: String = 'https://backend-empresa-deploy.herokuapp.com/empresa';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  listarCompromisso(id_funcionario: string): Observable<Compromisso[]> {
    const url = `${this.baseUrl}/compromisso-func/${id_funcionario}`
    return this.http.get<Compromisso[]>(url)
  }

  listarUmCompromisso(id_compromisso:string): Observable<Compromisso>{
    const url = `${this.baseUrl}/compromisso/${id_compromisso}`
    return this.http.get<Compromisso>(url)
  }

  // /compromisso/{id_compromisso}

  cadastrarCompromisso(id_funcionario: string, compromisso: Compromisso
  ): Observable<Compromisso> {
    const url = `${this.baseUrl}/funcionario/compromisso/${id_funcionario}`
    return this.http.post<Compromisso>(url, compromisso)
  }

  concluirCompromisso(id_compromisso:string, compromisso:Compromisso):Observable<Compromisso>{
    const url = `${this.baseUrl}/concluir-compromisso/${id_compromisso}`
    return this.http.put<Compromisso>(url, compromisso)
  }
  cancelarCompromisso(id_compromisso:string, compromisso:Compromisso):Observable<Compromisso>{
    const url = `${this.baseUrl}/cancelar-compromisso/${id_compromisso}`
    return this.http.put<Compromisso>(url, compromisso)
  }

  editarCompromisso(id_compromisso:string , id_funcionario: string, compromisso:Compromisso ):Observable<Compromisso>{
    const url = `${this.baseUrl}/funcionario/compromisso/${id_compromisso}/${id_funcionario}`
    return this.http.put<Compromisso>(url, compromisso)
  }

  // /funcionario/compromisso/{id_compromissso}/{id_funcionario}
}
