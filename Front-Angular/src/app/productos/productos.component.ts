import {Component, OnInit} from '@angular/core';
import {ProductosService} from "./productos.service";

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  constructor(private productosService: ProductosService) {
  }

  show21 = false;
  show22 = false;
  show23 = false;
  show24 = false;

  codigo: any = '';
  inicioCod: any = '';
  nombre: any = '';
  descripcion: any = '';
  stock: any = '';
  precioBase: any = '';
  porcentaje: any = '';
  categoria: any[] = [];
  productos: any[] = [];
  linea: string = '';
  imagen: any[] = [];
  selectedFile: File | null = null;

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarProducto();

  }

  cargarProducto() {
    this.productosService.getProducto().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => {
        this.cargarProducto();
      }
    });
  }

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

  onFileSelect(event: any): void {
    const file: File = event.target.files[0];  // Obtiene el primer archivo seleccionado
    if (file) {
      this.selectedFile = file;
    }
  }

  enviarImagen(productoId: number): void { // Agregamos 'productoId' como parámetro
    if (!this.selectedFile) {
      console.error('No se ha seleccionado una imagen.');
      return;
    }

    const formData = new FormData();
    // Usamos el ID pasado como parámetro
    formData.append('producto', productoId.toString());
    formData.append('imagen_file', this.selectedFile, this.selectedFile.name);

    // Usamos el ID pasado como parámetro
    this.productosService.subirImagen(productoId, formData).subscribe(
      response => {
        console.log('Imagen subida con éxito', response);
      },
      error => {
        console.error('Error al subir la imagen', error);
      }
    );
  }

  crearProducto() {
    const body = {
      codigo: this.codigo,
      nombre: this.nombre,
      descripcion: this.descripcion,
      precio_unitario: this.precioBase.toString(),
      iva_porcentaje: this.porcentaje.toString(),
      stock_total: this.stock,
      estado: 'activo',
      linea: this.linea
    };
    console.log(body);
    this.productosService.crearProducto(body).subscribe({
      next: (resp) => {
        const nuevoId = resp.id;

        // Llamamos a enviarImagen usando el ID REAL
        this.enviarImagen(nuevoId);


        alert("Categoria creada");
        this.nombre = '';
        this.descripcion = '';
        this.toggle(1)
        this.cargarProducto();
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

  generarCodigo(catId: any) {

    let target = catId.toString();  // El id que deseas verificar
    for (let categoria of this.categoria) {
      let categoriaString = categoria.id.toString();
      if (target === categoriaString) {
        this.inicioCod = categoria.nombre.slice(0, 3);  // Extraemos los primeros 3 caracteres del nombre
        this.codigo = this.inicioCod.toUpperCase() + ' ' + this.obtenerIdAnterior();
        return;
      }
    }
  }


  obtenerIdAnterior(): number {
    if (this.productos.length > 0) {
      const maxId = Math.max(...this.productos.map(producto => producto.id));
      return maxId - 1;
    }
    return 0; // Si no hay productos, retornamos 0 o cualquier otro valor inicial que desees
  }

}
