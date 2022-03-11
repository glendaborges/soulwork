import { Router } from '@angular/router';
import { CargoService } from './../../services/cargo.service';
import { Cargo } from './../../models/cargo';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CadastrarCargoComponent } from '../cadastrar-cargo/cadastrar-cargo.component';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-listar-cargos',
  templateUrl: './listar-cargos.component.html',
  styleUrls: ['./listar-cargos.component.css'],
})
export class ListarCargosComponent implements OnInit {
  cargo: Cargo = {
    car_nome: '',
    car_atribuicao: '',
  };
  cargos: Cargo[] = [];
  closeResult:any



constructor(private cargoService: CargoService, public dialog: MatDialog, private router:Router, private modalService: NgbModal) {}

  ngOnInit() {
    this.MostrarCargos();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CadastrarCargoComponent, {
      width: '500px',

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }



  MostrarCargos() {
    this.cargoService.buscarTodos().subscribe((res) => {
      this.cargos = res;

      console.log(this.cargos, 'cargos');
    });
  }

  deletarCargo(id:string){
    this.cargoService.deletarCargo(id).subscribe({
      complete: () => {
        this.cargoService.mensagem('Cargo excluído com sucesso')

      },
      error: () => {
        this.cargoService.mensagem('Não foi possível deletar esse cargo, pois existem funcionários associados a ele.')
      },
    })

  }

  editarCargo( cargo:Cargo) {
    this.cargoService.editarCargo(cargo).subscribe({
      complete: () => {
        this.cargoService.mensagem('Cargo editado com sucesso!')
        this.router.navigate(['/cargos']);
      },
    });
  }

  open(content: any) {

    this.modalService.open(content, { size: 'md' }).result.then(
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
}
