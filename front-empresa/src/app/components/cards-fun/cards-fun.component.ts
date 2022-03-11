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

@Component({
  selector: 'app-cards-fun',
  templateUrl: './cards-fun.component.html',
  styleUrls: ['./cards-fun.component.css'],
})
export class CardsFunComponent implements OnInit {
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

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router,
    private route: ActivatedRoute, private modalService: NgbModal, private cargoService:CargoService, private http:HttpClient, private enderecoService:EnderecoService
  ) {
    this.id_cargo = this.route.snapshot.paramMap.get('id_cargo')!;
  }

  ngOnInit() {
    this.pegarFunCargo()
    this.buscarCargos()
    // this.pegarUmFunc()
  }

  pegarFunCargo() {
    this.funcionarioService.buscarFunCargo(this.id_cargo).subscribe((res) => {
      this.funcionarios = res;

      console.log(this.funcionarios)
    });
  }

  pegarUmFunc(id:any){
    this.funcionarioService.buscarUmfunCargo(id).subscribe( res =>{
      this.funcionario = res
      this.funcionario.id_cargo = this.id_cargo
      console.log(this.funcionario, "um func")
    })
  }

  recarregar(){
    this.pegarFunCargo()
  }


  deletarFun( id_fun:string){
    this.funcionarioService.deletarFun(id_fun).subscribe({
      complete:() =>{ this.funcionarioService.mensagem("Funcionário excluído com sucesso")},
      error: () => this.funcionarioService.mensagem("Erro ao excluir funcionário")
    })
  }

  cadastrarFunc(){
    this.funcionarioService.cadastrarFun(this.funcionario,this.id_cargo).subscribe({
      complete: () =>{
        this.funcionarioService.mensagem("Funcionário cadastrado com sucesso")
        this.pegarFunCargo()
      },
      error: () => this.funcionarioService.mensagem("Erro ao cadastrar funcionário")

    })
  }

  editarFunc(){
    this.funcionarioService.editarFun(this.funcionario.id_funcionario, this.funcionario.id_cargo, this.funcionario).subscribe({
      complete: () => {this.funcionarioService.mensagem("Funcionário editado com sucesso")
                       this.router.navigate([`/funcionarios/${this.funcionario.id_cargo}`])
                      console.log(this.funcionario) },
      error: () =>{ this.funcionarioService.mensagem("não foi possível editar o aluno")}
    })
  }

  buscarCargos(){
    this.cargoService.buscarTodos().subscribe( res =>{
      this.cargos = res
    })
  }

  subirFoto(event:any, func_nome:any, id_funcionario:any){
    if(event.target.files && event.target.files[0]){
      this.foto = event.target.files[0]

      const formData = new FormData
      formData.append("foto", this.foto)

      const nome:string = func_nome + '-' + event.target.files[0].name
      // http://localhost:8080/escola/envio/6?nome=yyyyyy

      // console.log(`http://localhost:8080/escola/envio/${this.idProfCadastrado}?nome=${nome}`)

      this.http.post(`http://localhost:8080/empresa/envio/${id_funcionario}?nome=${nome}`, formData).subscribe({
        complete: () => console.log("foto enviada")
      })
      this.funcionarioService.mensagem("foto anexada ao funcionário " + func_nome)

    }
  }

  buscarEndereco(id_funcionario:string){
    this.enderecoService.buscarFuncEndereco(id_funcionario).subscribe( res =>{
      this.enderecoFuncionario = res
      this.endereco = res
      console.log(res)
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
      complete: () => { this.cargoService.mensagem("Endereço cadastrado com sucesso!")
                        },
      error:() => {this.cargoService.mensagem("Erro ao cadastrar endereço!")}
    })
  }

  editarEndereco(id_funcionario:string){
    this.enderecoService.editarEndereco(this.endereco.id_endereco, id_funcionario, this.endereco).subscribe({
      complete: () => { this.cargoService.mensagem("Endereço editado com sucesso!")
                        },
      error:() => {this.cargoService.mensagem("Erro ao editar endereço!")}
    })
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
