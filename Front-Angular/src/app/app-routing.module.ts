import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {PasswordComponent} from "./password/password.component";
import {InicioComponent} from "./inicio/inicio.component";
import {DashboardLayoutComponent} from "./layouts/dashboard-layout/dashboard-layout.component";
import {ReportesComponent} from "./reportes/reportes.component";
import {ProductosComponent} from "./productos/productos.component";
import {VentasComponent} from "./ventas/ventas.component";
import {UsuariosComponent} from "./usuarios/usuarios.component";
import {CategoriasComponent} from "./categorias/categorias.component";
import {ClientesComponent} from "./clientes/clientes.component";

let AuthLayoutComponent;
const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'recordar', component: PasswordComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: 'inicio', component: InicioComponent },
      {path: 'reportes', component: ReportesComponent },
      {path: 'productos', component: ProductosComponent },
      {path: 'ventas', component: VentasComponent },
      {path: 'usuario', component: UsuariosComponent },
      {path: 'categorias', component: CategoriasComponent },
      {path: 'cliente', component: ClientesComponent },
      { path: '', redirectTo: 'inicio', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
