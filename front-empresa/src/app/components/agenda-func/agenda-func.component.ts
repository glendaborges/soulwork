import { Funcionario } from './../../models/funcionario';
import { FuncionarioService } from './../../services/funcionario.service';
import { ActivatedRoute } from '@angular/router';
import { Compromisso } from './../../models/compromisso';
import { CompromissoService } from './../../services/compromisso.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-agenda-func',
  templateUrl: './agenda-func.component.html',
  styleUrls: ['./agenda-func.component.css']
})
export class AgendaFuncComponent implements OnInit {

  semCompromisso:boolean = true
  id_funcionario:any
  compromissos:Compromisso[] = []
  compromisso:Compromisso = {
    con_nome: '',
    con_data: '',
    con_localizacao: '',
    con_status:'PENDENTE',
    id_compromisso:''
  }
  compromissoEdit:Compromisso = {
    con_nome: '',
    con_data: '',
    con_localizacao: '',
    con_status:'',
    id_compromisso:''
  }
  funcionario?:Funcionario

  semana: any = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sabádo",
    "Domingo"
  ]

  mesSelect:any[] | undefined;
  dataSelect:any;
  closeResult:any





  constructor(private compromissoService:CompromissoService, private route:ActivatedRoute, private funcionarioService:FuncionarioService, private modalService: NgbModal) {
    this.id_funcionario = this.route.snapshot.paramMap.get("id_funcionario")

  }

  ngOnInit() {
    this.listarCompromissos()
    this.buscarFunc()
    this.getDiasData(5,2022)
  }

  getDiasData(mes:any, ano:any){
    moment.locale('pt-br');
    const dataInicial = moment.utc(`${ano}/${mes}/01`)
    const dataFinal = dataInicial.clone().endOf('month')
    this.dataSelect = dataInicial

    const diffDias = dataFinal.diff(dataInicial, 'days', true)

    const numDias = Math.round(diffDias)

    const arrayDias = Object.keys([... Array(numDias)]).map((a:any) => {
     a = parseInt(a) +1
     const diaObject = moment(`${ano}/${mes}/${a}`)
      return {
        name: diaObject.format("dddd"),
        value:a,
        indexWeek: diaObject.isoWeekday()
      }
    })
    this.mesSelect = arrayDias
  }

  mudarMes(flag:any){
    if(flag < 0){
      const proxData = this.dataSelect.clone().subtract(1, "month")
      this.getDiasData(proxData.format("MM"), proxData.format("YYYY"))
    }else{
      const proxData = this.dataSelect.clone().add(1, "month")
      this.getDiasData(proxData.format("MM"), proxData.format("YYYY"))
    }
  }

  open(content: any) {

    this.modalService.open(content, { size: 'md',centered: true }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  listarCompromissos(){
    this.compromissoService.listarCompromisso(this.id_funcionario).subscribe( res =>{
      this.compromissos = res

      console.log(this.compromissos)
    })
  }

  listarUmCompromisso(id_compromisso:string){
    this.compromissoService.listarUmCompromisso(id_compromisso).subscribe( res => {
      this.compromissoEdit = res
    })
  }

  buscarFunc(){
    this.funcionarioService.buscarUmfunCargo(this.id_funcionario).subscribe( res =>{
      this.funcionario = res;
      console.log(res)
    })
  }

  cadastrarCompromisso(){
    this.compromissoService.cadastrarCompromisso(this.id_funcionario, this.compromisso).subscribe({
      complete: () =>{ this.funcionarioService.mensagem("Evento adicionado com sucesso!"),
                                                       this.listarCompromissos()},
      error: () => { this.funcionarioService.mensagem("Erro ao adicionar evento!")}
    })

  }
  resetarModal(){
    this.funcionario = {
      func_nome:'',
      func_cpf: '',
      func_formacao:''
    }
  }

  concluirCompromisso(id_compromisso:string, compromisso:Compromisso){
    this.compromissoService.concluirCompromisso(id_compromisso, compromisso).subscribe({
      complete: () => { this.funcionarioService.mensagem("Evento Concluído!"),
                         this.listarCompromissos()},
      error:() => { this.funcionarioService.mensagem("Erro!!")}
    })
  }
  cancelarCompromisso(id_compromisso:string, compromisso:Compromisso){
    this.compromissoService.cancelarCompromisso(id_compromisso, compromisso).subscribe({
      complete: () => { this.funcionarioService.mensagem("Evento Cancelado!")
                        this.listarCompromissos()},
      error:() => { this.funcionarioService.mensagem("Erro!!")}
    })
  }


  editarCompromisso(id_compromisso:string  ){
    this.compromissoService.editarCompromisso(id_compromisso, this.id_funcionario, this.compromissoEdit).subscribe({
      complete: () =>{ this.funcionarioService.mensagem("Compromisso Editado com Sucesso!")
                        this.listarCompromissos()},
      error: () => { this.funcionarioService.mensagem("errooo")}
    })
  }

}
