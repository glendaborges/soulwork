import { Compromisso } from './../models/compromisso';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CompromissoService {

  baseUrl: String = 'http://localhost:8080/empresa';

constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

listarCompromisso(id_funcionario:string):Observable<Compromisso[]>{
  const url = `${this.baseUrl}/compromisso-func/${id_funcionario}`
   return this.http.get<Compromisso[]>(url)
}
// /compromisso-func/1

}
