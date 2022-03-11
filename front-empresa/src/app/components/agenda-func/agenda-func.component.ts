import { ActivatedRoute } from '@angular/router';
import { Compromisso } from './../../models/compromisso';
import { CompromissoService } from './../../services/compromisso.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-agenda-func',
  templateUrl: './agenda-func.component.html',
  styleUrls: ['./agenda-func.component.css']
})
export class AgendaFuncComponent implements OnInit {

  id_funcionario:any
  compromissos:Compromisso[] = []

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

  



  constructor(private compromissoService:CompromissoService, private route:ActivatedRoute) {
    this.id_funcionario = this.route.snapshot.paramMap.get("id_funcionario")

  }

  ngOnInit() {
    this.listarCompromissos()
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

  listarCompromissos(){
    this.compromissoService.listarCompromisso(this.id_funcionario).subscribe( res =>{
      this.compromissos = res
      console.log(this.compromissos)
    })
  }

}
