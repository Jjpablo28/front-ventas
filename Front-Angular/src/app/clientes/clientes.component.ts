import {Component, OnInit} from '@angular/core';
import {ClientesService} from "./clientes.service";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit{

  constructor(private clientesService: ClientesService) {}

departamentos:any[]=[];
  nombre:any='';
  tipoId:any='';
  numeroId:any='';
  direccion:any='';
  telefono:any='';
  correo:any='';
  tipoPago:any='';
  eNombre:any='';
  eTipoId:any='';
  eNumeroId:any='';
  eDireccion:any='';
  eTelefono:any='';
  eCorreo:any='';
  eTipoPago:any='';

  ngOnInit(): void {
    this.cargarDepartamentos();
    this.cargarMunicipios()
  }


  // Control de secciones
  showList = false;
  showCreate = false;
  showEdit = false;
  showDelete = false;

  // Datos mínimos de ejemplo
  clientes = [
    {
      nombre: 'Juan Pérez',
      tipoIdentificacion: 'CC',
      identificacion: '123456789',
      departamento: 'Antioquia',
      municipio: 'Medellín',
      telefono: '3100000000',
      tipoPago: 'contado'
    }
  ];

  // Para editar o eliminar
  clienteSeleccionado: any = null;


  clienteForm: any = {
    nombre: '',
    tipoIdentificacion: '',
    identificacion: '',
    departamento: '',
    municipio: '',
    direccion: '',
    telefono: '',
    correo: '',
    tipoPago: ''
  };


  municipios: string[] = [];

  // Abre solo una sección
  open(section: string, cliente?: any) {
    this.reset();

    if (section === 'list') this.showList = true;
    if (section === 'create') this.showCreate = true;

    if (section === 'edit') {
      this.showEdit = true;
      this.clienteSeleccionado = cliente || null;
      if (cliente) this.clienteForm = { ...cliente };
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

  guardarCliente() {}
  actualizarCliente() {}
  eliminarCliente() {}

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
