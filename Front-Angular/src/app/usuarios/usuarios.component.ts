import {Component, OnInit} from '@angular/core';
import {UsuariosService} from "./usuarios.service";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit {

  constructor(private usuariosService: UsuariosService) {
  }

  ngOnInit(): void {
    this.cargarUsuarios();
  }


  nombreCompleto: any = '';
  correo: any = '';
  user: any = '';
  eUser: any = '';
  contrasena: any = '';
  rol: any = '';
  estado: any = '';
  eNombreCompleto: any = '';
  eCorreo: any = '';
  usuarioSeleccionado: any = '';
  eRol: any = '';
  eEstado: any = '';
  usuarios: any[] = [];
  userId: any = '';

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

    if (section === 1) {
      this.rol = '';
      this.correo = '';
      this.nombreCompleto = '';
      this.user = '';
      this.userId = '';
      this.show1 = true;
    }
    if (section === 2) {
      this.rol = '';
      this.correo = '';
      this.nombreCompleto = '';
      this.user = '';
      this.userId = '';
      this.show2 = true;
    }
    if (section === 3) {
      if (this.nombreCompleto == '') {
        alert('Debe seleccionar algún usuario');
        return
      }

      this.show3 = true;
      return
    }
    if (section === 4) this.show4 = true;
    //if (section === 5) this.show5 = true;
  }


  cargarUsuarios() {
    this.usuariosService.getUser().subscribe({
        next: (data) => {
          this.usuarios = data;
        },
        error: (err) => {
          console.log('Error al cargar los usuarios' + err);

        }
      }
    )
  }

  crearUsuario() {

    if (this.rol == 'Administrador') {
      this.rol = 'ADMIN';
    } else {
      this.rol = 'USER';
    }
    const body = {
      username: this.user,
      email: this.correo,
      rol: this.rol,
      nombre_completo: this.nombreCompleto,
    };
    this.usuariosService.crearUser(body).subscribe({
      next: (data) => {
        console.log('Crear usuario');
        this.cargarUsuarios();
        this.toggle(1);
      },
      error: (err) => {
        console.log(err);
      }
    })

  }

  seleccionarEditar(usuario: any) {


    this.usuarioSeleccionado = usuario;
    this.rol = this.usuarioSeleccionado.rol;
    this.correo = this.usuarioSeleccionado.email;
    this.nombreCompleto = this.usuarioSeleccionado.nombre_completo;
    this.user = this.usuarioSeleccionado.username;
    this.userId = this.usuarioSeleccionado.id;
    this.toggle(3);
    if (this.rol == 'ADMIN') {
      this.rol = 'Administrador';
    } else {
      this.rol = 'Empleado';
    }
  }

  actualizarUsuario() {
    if (this.rol == 'Administrador') {
      this.rol = 'ADMIN';
    } else {
      this.rol = 'USER';
    }
    const body = {
      username: this.user,
      email: this.correo,
      rol: this.rol,
      nombre_completo: this.nombreCompleto,
    }
    this.usuariosService.updateUser(this.userId, body).subscribe({
      next: (data) => {
        alert('Usuario actualizado!')
        this.cargarUsuarios();
        this.toggle(1)
      },
      error: (err) => {
        console.log(err);
        alert('Error al actualizar')
      }

    })
  }

  seleccionarEliminar(usuario: any) {
    this.usuarioSeleccionado = usuario
    this.toggle(4);
    this.userId = this.usuarioSeleccionado.id

  }

  eliminarUsuario() {
    this.usuariosService.deleteUser(this.userId).subscribe({
      next: (data) => {
        alert('Usuario eliminado');
        this.cargarUsuarios();
        this.toggle(1);

      },
      error: (err) => {
        alert('Error al eliminar')
      }
    })
  }


}
