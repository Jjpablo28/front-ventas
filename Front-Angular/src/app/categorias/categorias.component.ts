import {Component} from '@angular/core';
import {CategoriasService} from "./categorias.service";

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  standalone: false,
  styleUrl: './categorias.component.scss'
})
export class CategoriasComponent {

  constructor(private categoriasService: CategoriasService) {
  }

  nombre: any = '';
  descrip: any = '';
  categorias: any[] = [];
  eNombre: any = '';
  eDescripcion: any = '';


  show1 = false;
  show2 = false;
  show3 = false;
  show4 = false;

  toggle(n: number) {

    if (1) {
      this.eNombre = '';
      this.eDescripcion = '';
    }
    this.show1 = n === 1;
    this.show2 = n === 2;
    if (n === 3) {
      if (!this.eNombre || !this.eDescripcion) {
        alert("Debe seleccionar una categoría en la sección de listado");
        this.show1 = true;
        this.show3 = false;
        return;
      }
      this.show3 = true;
      return;
    }

    this.show4 = n === 4;
    this.show3 = n === 5;
  }

  ngOnInit(): void {
    this.cargarCategorias();
  }

  crearLinea() {
    const body = {
      nombre: this.nombre,
      descripcion: this.descrip
    };
    this.categoriasService.crearLinea(body).subscribe({
      next: (resp) => {
        alert("Categoria creada");
        this.nombre = '';
        this.descrip = '';
        this.toggle(1)
        this.cargarCategorias();
      },
      error: (err) => {
        alert("Error al crear categoria");
      }
    });
  }

  cargarCategorias() {
    this.categoriasService.getLineas().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (err) => {
        this.cargarCategorias();
      }
    });
  }

  lineaSeleccionada: any = null;

  editarLinea(linea: any) {
    this.lineaSeleccionada = linea;
    this.toggle(5); // si quieres mostrar la sección de editar
    this.eNombre = this.lineaSeleccionada.nombre;
    this.eDescripcion = this.lineaSeleccionada.descripcion;

  }

  actualizarLinea() {
    const id = this.lineaSeleccionada.id;

    const data = {
      nombre: this.eNombre,
      descripcion: this.eDescripcion,
    };

    this.categoriasService.updateLinea(id, data).subscribe({
      next: (resp) => {
        alert("Categoria actualizada correctamente");
        this.eDescripcion = '';
        this.eNombre = '';
        this.toggle(1);
        this.cargarCategorias();
      },
      error: (err) => {
        console.error(err);
        alert("Error actualizando la categoria");
      }
    });
  }

  seleccionarLinea(linea:any){
    this.lineaSeleccionada = linea;
    this.toggle(4); // si quieres mostrar la sección de editar
  }

  eliminarCategoria() {
    const id = this.lineaSeleccionada.id;
    this.categoriasService.eliminarLinea(id).subscribe({
        next: () => {
          alert('Categoria eliminada');
          this.toggle(1);
          this.cargarCategorias()
        },
        error: (err) => {
          alert('Error al eliminar el categoria');
        }
      }
    )
  }
}
