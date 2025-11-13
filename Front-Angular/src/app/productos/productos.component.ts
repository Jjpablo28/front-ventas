import {Component} from '@angular/core';
import {ProductosService} from "./productos.service";

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent {

  constructor(private productosService: ProductosService) {
  }

  show21 = false;
  show22 = false;
  show23 = false;
  show24 = false;

  codigo: any = '';
  nombre: any = '';
  descripcion: any = '';
  stock: any = '';
  precioBase: any = '';
  porcentaje: any = '';
  categoria: any[] = [];
  productos: any[] = [];
  imagen: any[] = [];

  ngOnInit(): void {
    this.cargarCategorias();
   // this.cargarProducto();
  }

 /* cargarProducto() {
    this.productosService.getProducto().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => {
        this.cargarProducto();
      }
    });
  }*/
  cargarCategorias() {
    this.productosService.getCategorias().subscribe({
      next: (data) => {
        this.categoria = data;
      },
      error: (err) => {
        this.cargarCategorias();
      }
    });
  }

  crearProducto() {
    const body = {
      codigo: this.codigo,
      nombre: this.nombre,
      descripcion: this.descripcion,
      precio_unitario: this.precioBase,
      iva_porcentaje: this.porcentaje,
      stock_total: this.stock,
      estado: 'activo',
      linea: this.categoria
    };
    this.productosService.crearProducto(body).subscribe({
      next: (resp) => {
        alert("Categoria creada");
        this.nombre = '';
        this.descripcion = '';
        this.toggle(1)
        //this.cargarProducto();
      },
      error: (err) => {
        alert("Error al crear categoria");
      }
    });
  }

  toggle(section: number) {

    // Primero ocultar todas
    this.show21 = false;
    this.show22 = false;
    this.show23 = false;
    this.show24 = false;

    // Luego abrir solo la que se presionó
    if (section === 21) this.show21 = true;
    if (section === 22) this.show22 = true;
    if (section === 23) this.show23 = true;
    if (section === 24) this.show24 = true;
  }


}
