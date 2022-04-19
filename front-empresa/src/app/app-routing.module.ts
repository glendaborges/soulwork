import { AgendaFuncComponent } from './components/agenda-func/agenda-func.component';
import { CardsFunComponent } from './components/cards-fun/cards-fun.component';
import { CadastrarCargoComponent } from './components/cadastrar-cargo/cadastrar-cargo.component';
import { ListarCargosComponent } from './components/listar-cargos/listar-cargos.component';
import { HomeComponent } from './templates/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cargos', component: ListarCargosComponent },
  { path: 'cadastrarCargo', component: CadastrarCargoComponent },
  { path: 'funcionarios/:id_cargo', component: CardsFunComponent },
  {
    path: 'funcionario/agenda/:id_funcionario',
    component: AgendaFuncComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
