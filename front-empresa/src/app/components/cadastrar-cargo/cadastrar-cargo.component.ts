import { ListarCargosComponent } from './../listar-cargos/listar-cargos.component';
import { CargoService } from './../../services/cargo.service';
import { Cargo } from './../../models/cargo';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-cadastrar-cargo',
  templateUrl: './cadastrar-cargo.component.html',
  styleUrls: ['./cadastrar-cargo.component.css']
})
export class CadastrarCargoComponent implements OnInit {

  cargo: Cargo = {
    car_nome: '',
    car_atribuicao: ''
  }

  constructor(private cargoService: CargoService, private route: Router, public dialog: MatDialogRef<ListarCargosComponent>) { }

  ngOnInit() {
  }


  cadastrarCargo() {
    this.cargoService.cadastrarTurma(this.cargo).subscribe({
      complete: () => {
        this.cargoService.mensagem("Cargo cadastrado com sucesso!")
        this.dialog.close()
      },
      error: () =>{this.cargoService.mensagem("Erro ao cadastrar cargo!")}


    })
  }

  closeDialog(){
    this.dialog.close();
  }

}
