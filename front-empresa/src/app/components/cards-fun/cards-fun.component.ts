import { OwlOptions } from 'ngx-owl-carousel-o';
import { Endereco } from './../../models/endereco';
import { EnderecoService } from './../../services/endereco.service';
import { Funcionario } from './../../models/funcionario';
import { Router, ActivatedRoute } from '@angular/router';
import { FuncionarioService } from './../../services/funcionario.service';
import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CargoService } from 'src/app/services/cargo.service';
import { Cargo } from 'src/app/models/cargo';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cards-fun',
  templateUrl: './cards-fun.component.html',
  styleUrls: ['./cards-fun.component.css'],
})
export class CardsFunComponent implements OnInit {
  imgFunc!:string
  id_cargo: string = '';
  panelOpenState = false;
  showMe:boolean = false
  funcionarios: Funcionario[] = [];
  funcionario:Funcionario ={
    func_nome: '',
    func_formacao: '',
    func_cpf:'',
    id_cargo: this.id_cargo
  }
  endereco:Endereco = {
    end_cep: '',
    end_cidade: '',
    end_estado:'',
    end_rua:''
  }
  enderecoCad:Endereco = {
    end_cep: '',
    end_cidade: '',
    end_estado:'',
    end_rua:''
  }
  closeResult:any
  formEndereco:boolean = false
  infoCadastro:boolean = true
  enderecoFuncionario!:Endereco
  foto:any
  cargos:Cargo[] = []
  infoCargo?:Cargo

  // carrossel
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }


  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router,
    private route: ActivatedRoute, private modalService: NgbModal, private cargoService:CargoService, private http:HttpClient, private enderecoService:EnderecoService, private location:Location
  ) {
    this.id_cargo = this.route.snapshot.paramMap.get('id_cargo')!;

  }

  ngOnInit() {
    this.pegarFunCargo()
    this.buscarCargos()
    this.pegarCargo()
    // this.pegarUmFunc()
  }

  pegarCargo(){
    this.cargoService.buscarUm(this.id_cargo).subscribe(res => {
      this.infoCargo = res

    })

    }


  pegarFunCargo() {
    this.funcionarioService.buscarFunCargo(this.id_cargo).subscribe((res) => {
      this.funcionarios = res;


    });
  }

  pegarUmFunc(id:any){
    this.funcionarioService.buscarUmfunCargo(id).subscribe( res =>{
      this.funcionario = res
      this.funcionario.id_cargo = this.id_cargo

    })
  }

  recarregar(){
    this.pegarFunCargo()
  }


  deletarFun( id_fun:string){
    this.funcionarioService.deletarFun(id_fun).subscribe({
      complete:() =>{ this.funcionarioService.mensagem("Funcion??rio exclu??do com sucesso")
                      this.pegarFunCargo()},
      error: () => this.funcionarioService.mensagem("Esse funcion??rio n??o pode ser exclu??do, pois possui endere??o e compromissos associados a ele.")
    })
  }

  cadastrarFunc(){
    this.funcionarioService.cadastrarFun(this.funcionario,this.id_cargo).subscribe({
      complete: () =>{
        this.funcionarioService.mensagem("Funcion??rio cadastrado com sucesso")
        // this.funcionario.func_img = 'default-img.png'
        this.pegarFunCargo()
      },
      error: () => this.funcionarioService.mensagem("Erro ao cadastrar funcion??rio")

    })
  }

  editarFunc(){
    this.funcionarioService.editarFun(this.funcionario.id_funcionario, this.funcionario.id_cargo, this.funcionario).subscribe({
      complete: () => {this.funcionarioService.mensagem("Funcion??rio editado com sucesso")
                       this.router.navigate([`/funcionarios/${this.funcionario.id_cargo}`])
                       this.pegarFunCargo() },
      error: () =>{ this.funcionarioService.mensagem("n??o foi poss??vel editar o funcio??rio!")}
    })
  }

  buscarCargos(){
    this.cargoService.buscarTodos().subscribe( res =>{
      this.cargos = res
    })
  }

  salvarFoto(id_func:string, funcionario:Funcionario){
    this.funcionarioService.addImg(id_func, funcionario, this.funcionario.func_img).subscribe({
      next: () => {this.funcionarioService.mensagem("foto anexada ao funcion??rio ")
                      },
      error: (e) =>{console.log(e)},
      complete: () => {this.pegarFunCargo()}

    })

  }
  salvarfoto2(event:any,id_func:string, funcionario:Funcionario){
    this.funcionarioService.addImg(id_func, funcionario, event.target.value).subscribe({
      next: () => {this.funcionarioService.mensagem("foto anexada ao funcion??rio ")
                      },
      error: (e) =>{console.log(e)},
      complete: () => {this.pegarFunCargo()}

    })
  }

  subirFoto(event:any, func_nome:any, id_funcionario:any){
    if(event.target.files && event.target.files[0]){
      this.foto = event.target.files[0]

      const formData = new FormData
      formData.append("foto", this.foto)

      const nome:string = func_nome + '-' + event.target.files[0].name

      this.http.post(`https://backend-empresa-deploy.herokuapp.com/empresa/envio/${id_funcionario}?nome=${nome}`, formData).subscribe({
        complete: () => console.log("foto enviada")
      })
      this.funcionarioService.mensagem("foto anexada ao funcion??rio " + func_nome)

    }
  }

  buscarEndereco(id_funcionario:string){
    this.enderecoService.buscarFuncEndereco(id_funcionario).subscribe( res =>{
      this.enderecoFuncionario = res
      this.endereco = res

    })
  }

  mostrarForm(){
    this.formEndereco = true
    this.infoCadastro = false
  }
  fecharForm(){
    this.formEndereco = false
    this.infoCadastro = true
  }

  cadastrarEndereco(id_funcionario:string){
    this.enderecoService.cadastrarEndereco(id_funcionario, this.enderecoCad).subscribe({
      complete: () => { this.cargoService.mensagem("Endere??o cadastrado com sucesso!")
                        },
      error:() => {this.cargoService.mensagem("Erro ao cadastrar endere??o!")}
    })
  }

  editarEndereco(id_funcionario:string){
    this.enderecoService.editarEndereco(this.endereco.id_endereco, id_funcionario, this.endereco).subscribe({
      complete: () => { this.cargoService.mensagem("Endere??o editado com sucesso!")
                        },
      error:() => {this.cargoService.mensagem("Erro ao editar endere??o!")}
    })
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
}
