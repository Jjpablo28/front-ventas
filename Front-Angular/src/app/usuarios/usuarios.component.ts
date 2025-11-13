import { Component } from '@angular/core';
import {UsuariosService} from "./usuarios.service";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {

  constructor(private usuariosService: UsuariosService) {}

  nombreCompleto:any='';
  correo:any='';
  contrasena:any='';
  rol:any='';
  estado:any='';
  eNombreCompleto:any='';
  eCorreo:any='';
  eRol:any='';
  eEstado:any='';

  show1 = false;
  show2 = false;
  show3 = false;
  show4 = false;
  show5 = false;

  toggle(section: number) {
    this.show1 = false;
    this.show2 = false;
    this.show3 = false;
    this.show4 = false;
    this.show5 = false;

    if (section === 1) this.show1 = true;
    if (section === 2) this.show2 = true;
    if (section === 3) this.show3 = true;
    if (section === 4) this.show4 = true;
    if (section === 5) this.show5 = true;
  }
}
