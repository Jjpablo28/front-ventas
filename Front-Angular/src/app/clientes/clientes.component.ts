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
  departamentosBack: any[] = [];
  listaMunicipios: any[] = [];
  fechaHora: any = '';
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
  idDepartamento: any = '';
  idMunicipio: any = '';
  codigo: any = '';

  ngOnInit(): void {
    this.cargarDepartamentos();
    this.cargarMunicipios();
    this.cargarClientes()
    this.cargarDepartamento();
    this.cargarMunicipio();

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

  cargarDepartamento() {
    this.clientesService.getDepartamento().subscribe({
      next: data => {
        this.departamentosBack = data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  cargarMunicipio() {
    this.clientesService.getMunicipio().subscribe({
      next: data => {
        this.listaMunicipios = data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }



  crearMunicipio(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.codigo = Math.random().toString(36).substring(2, 6);
      this.fechaHora = new Date().toISOString();
      const body = {
        nombre: this.municipio,
        codigo: this.codigo,
        fecha_creacion: this.fechaHora,
        departamento: this.idDepartamento,
      };

      this.clientesService.crearMunicipio(body).subscribe({
        next: data => {
          console.log('Municipio creado');
          this.idDepartamento = id;
          this.cargarMunicipio();
          resolve();  // Resolvemos la promesa cuando el municipio se haya creado
        },
        error: (err) => {
          console.log(err);
          reject(err);  // Rechazamos la promesa si ocurre un error
        }
      });
    });
  }


  async verificarMunicipio() {
    // Verificar si el municipio ya está en la lista
    const municipioExistente = this.listaMunicipios.find(municipio => municipio.nombre === this.municipio);

    if (municipioExistente) {
      // Si el municipio existe, asignamos el id
      this.idMunicipio = municipioExistente.id;
    } else {
      // Si no existe, lo creamos
      await this.crearMunicipio(this.idDepartamento);  // Esperamos a que se cree el municipio
      await this.verificarMunicipio();  // Llamamos a verificarMunicipio de nuevo después de la creación
    }
  }

  async crearCliente() {
    // Verificar el departamento
    for (let i = 0; i < this.departamentosBack.length; i++) {
      if (this.departamento == this.departamentosBack[i].nombre) {
        this.idDepartamento = this.departamentosBack[i].id;
      }
    }

    // Verificar o crear el municipio
    await this.verificarMunicipio();  // Esperamos a que el municipio esté verificado o creado

    // Llamamos a cargar los departamentos y municipios
    this.cargarDepartamento();
    this.cargarMunicipio();

    // Buscar el municipio y asignar el idMunicipio
    for (let i = 0; i < this.listaMunicipios.length; i++) {
      if (this.municipio == this.listaMunicipios[i].nombre) {
        this.idMunicipio = this.listaMunicipios[i].id;
      }
    }

    // Crear el cliente
    const body = {
      nombre: this.nombre,
      tipo_documento: this.tipoId,
      documento: this.numeroId,
      correo: this.correo,
      telefono: this.telefono,
      direccion: this.direccion,
      tipo_pago: this.tipoPago.toUpperCase(),
      credito_maximo: this.credito,
      estado: this.estado,
      municipio: this.idMunicipio,
    };

    // Crear cliente y esperar la respuesta
    this.clientesService.crearCliente(body).subscribe({
      next: data => {
        alert("Cliente creado");
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  editarCliente() {
    const body = {
      nombre: this.eNombre,
      tipo_documento: this.eTipoId,
      documento: this.eNumeroId,
      correo: this.eCorreo,
      telefono: this.eTelefono,
      direccion: this.eDireccion,
      tipo_pago: this.eTipoPago,
      credito_maximo: this.eCredito,
      estado: this.eEstado,
      municipio: this.eMunicipio,
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
