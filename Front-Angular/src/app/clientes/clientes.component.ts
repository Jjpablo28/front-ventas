import {Component, OnInit} from '@angular/core';
import {ClientesService} from "./clientes.service";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  constructor(private clientesService: ClientesService) {
  }

  departamentos: any[] = [];
  nombre: any = '';
  tipoId: any = '';
  numeroId: any = '';
  departamento: any = '';
  municipio: any = '';
  direccion: any = '';
  telefono: any = '';
  correo: any = '';
  tipoPago: any = '';
  credito: any = '';
  estado: any = '';
  eNombre: any = '';
  eTipoId: any = '';
  eNumeroId: any = '';
  eDepartamento: any = '';
  eMunicipio: any = '';
  eDireccion: any = '';
  eTelefono: any = '';
  eCorreo: any = '';
  eTipoPago: any = '';
  eCredito: any = '';
  eEstado: any = '';
  clientes: any [] = [];

  ngOnInit(): void {
    this.cargarDepartamentos();
    this.cargarMunicipios();
    this.cargarClientes()
  }

  cargarClientes() {
    this.clientesService.getClientes().subscribe({
      next: data => {
        this.clientes = data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  crearCliente() {
    const body = {
      nombre: this.nombre,
      tipo_documento: this.tipoId,
      documento: this.numeroId,
      correo: this.correo,
      telefono: this.telefono,
      direccion: this.direccion,
      tipo_pago: this.tipoPago,
      credito_maximo: this.credito,
      estado: this.estado,
      municipio: this.municipio,

    }


  }

  actualizarCiente() {

  }

  editarCliente() {
    const body = {
      nombre: this.eNombre,
      tipo_documento:
      this.eTipoId,
      documento:
      this.eNumeroId,
      correo:
      this.eCorreo,
      telefono:
      this.eTelefono,
      direccion:
      this.eDireccion,
      tipo_pago:
      this.eTipoPago,
      credito_maximo:
      this.eCredito,
      estado:
      this.eEstado,
      municipio:
      this.eMunicipio,
    }
  }

  seleccionarCliente(cliente: any) {

  }

  seleccionarClienteE(cliente: any) {

  }

  eliminarCliente() {

  }

  // Control de secciones
  showList = false;
  showCreate = false;
  showEdit = false;
  showDelete = false;

  // Datos mínimos de ejemplo


  // Para editar o eliminar
  clienteSeleccionado: any = null;


  municipios: string[] = [];

  // Abre solo una sección
  open(section: string, cliente?: any) {
    this.reset();

    if (section === 'list') this.showList = true;
    if (section === 'create') this.showCreate = true;

    if (section === 'edit') {
      this.showEdit = true;
      this.clienteSeleccionado = cliente || null;
      //if (cliente) this.clienteForm = {...cliente};
    }

    if (section === 'delete') {
      this.showDelete = true;
      this.clienteSeleccionado = cliente || null;
    }
  }

  // Oculta todas las secciones
  reset() {
    this.showList = false;
    this.showCreate = false;
    this.showEdit = false;
    this.showDelete = false;
  }


  // Funciones vacías para que el HTML no falle


  cargarDepartamentos() {
    this.clientesService.getDepartamentosNames().subscribe({
      next: (nombres) => {
        this.departamentos = nombres;
      },
      error: (err) => console.error(err)
    });
  }

  cargarMunicipios() {
    this.clientesService.getMunicipiosNames().subscribe({
      next: (nombres) => {
        this.municipios = nombres;
      },
      error: (err) => console.error(err)
    });
  }

}
