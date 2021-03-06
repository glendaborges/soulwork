import { Endereco } from './../models/endereco';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  baseUrl: String = 'https://backend-empresa-deploy.herokuapp.com/empresa';

constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

buscarFuncEndereco(id_funcionario:string):Observable<Endereco>{
  const url = `${this.baseUrl}/endereco-func/${id_funcionario}`
  return this.http.get<Endereco>(url)
}
// https://backend-empresa-deploy.herokuapp.com/empresa/endereco?funcionario=2
cadastrarEndereco(id_funcionario:string,  endereco:Endereco):Observable<Endereco>{
  const url = `${this.baseUrl}/endereco?funcionario=${id_funcionario}`
  return this.http.post<Endereco>(url, endereco)
}
// https://backend-empresa-deploy.herokuapp.com/empresa/endereco/1?funcionario=1
editarEndereco(id_endereco:string, id_funcionario:string, endereco:Endereco):Observable<Endereco>{
  const url = `${this.baseUrl}/endereco/${id_endereco}?funcionario=${id_funcionario}`
  return this.http.put<Endereco>(url, endereco)
}


}
