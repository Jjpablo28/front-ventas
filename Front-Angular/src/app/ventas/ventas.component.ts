import {Component, OnInit} from '@angular/core';
import {VentasService} from "./ventas.service";
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {

  fechaActual: string = new Date().toLocaleString();
  clienteSeleccionadoNombre: string = '';
  clienteSeleccionadoId: number | null = null;
  listaClientes: any[] = [];
  numeroFactura: string = 'PENDIENTE';
  formaPago: string = 'CONTADO';

  listaProductos: any[] = [];
  productoBusqueda: string = '';
  carrito: any[] = [];

  totalProductos: number = 0;
  totalGravados: number = 0;
  totalNoGravados: number = 0;
  totalIva: number = 0;
  totalGeneral: number = 0;

  private ID_USUARIO_VENDEDOR: number = 1;

  constructor(private ventasService: VentasService) {
  }

  ngOnInit(): void {
    this.cargarDatosIniciales();
  }
  agregarProductoDesdeBuscador() {
    const nombreBuscado = this.productoBusqueda;

    if (!nombreBuscado || nombreBuscado.trim() === '') {
      alert('Por favor, selecciona o escribe un producto.');
      return;
    }

    const productoEncontrado = this.listaProductos.find(p =>
      p.nombre.toLowerCase() === nombreBuscado.toLowerCase()
    );

    if (productoEncontrado) {
      this.agregarProductoAlCarrito(productoEncontrado);
      this.productoBusqueda = '';
    } else {
      alert('Producto no encontrado. Verifica el nombre.');
    }
  }

  cargarDatosIniciales() {
    forkJoin({
      clientes: this.ventasService.getCliente(),
      productos: this.ventasService.getProducto()
    }).subscribe({
      next: ({ clientes, productos }) => {
        this.listaClientes = clientes;

        console.log('Productos brutos (desde la API):', productos);

        this.listaProductos = productos.filter((p: any) =>
          p.estado.toLowerCase() === 'activo' &&
          p.stock_total > 0
        );
        console.log('Productos filtrados (para la lista):', this.listaProductos);
      },
      error: (err) => {
        console.error('Error al cargar datos iniciales:', err);
        alert('Error al cargar clientes o productos. Revisa la consola.');
      }
    });
  }




  buscarProducto(event: any) {
    const nombreBuscado = event.target.value;

    console.log('Buscando producto (Término):', nombreBuscado);

    const productoEncontrado = this.listaProductos.find(p => p.nombre.toLowerCase() === nombreBuscado.toLowerCase());

    console.log('Producto encontrado:', productoEncontrado);

    if (productoEncontrado) {
      this.agregarProductoAlCarrito(productoEncontrado);
      this.productoBusqueda = '';
    }
  }

  agregarProductoAlCarrito(producto: any) {

    const itemExistente = this.carrito.find(item => item.id === producto.id);

    if (itemExistente) {
      if (itemExistente.cantidad < producto.stock_total) {
        itemExistente.cantidad++;
      } else {
        alert(`El producto ${producto.nombre} alcanzó su stock máximo (${producto.stock_total}).`);
        return;
      }
    } else {
      const nuevoItem = {
        id: producto.id,
        codigo: producto.codigo,
        nombre: producto.nombre,
        stock_total: producto.stock_total,
        cantidad: 1,
        valorUnitario: parseFloat(producto.precio_unitario),
        iva: parseFloat(producto.iva_porcentaje),
        valorAntesIva: 0,
        valorIva: 0,
        totalLinea: 0
      };
      this.carrito.push(nuevoItem);
    }

    this.recalcularCarrito();
  }



  cambiarCantidad(index: number) {
    const item = this.carrito[index];

    if (item.cantidad < 1) {
      item.cantidad = 1;
    } else if (item.cantidad > item.stock_total) {
      alert(`La cantidad máxima para ${item.nombre} es ${item.stock_total}.`);
      item.cantidad = item.stock_total;
    }
    this.recalcularCarrito();
  }

  eliminarItem(index: number) {
    this.carrito.splice(index, 1);
    this.recalcularCarrito();
  }

  recalcularCarrito() {
    this.totalProductos = 0;
    this.totalGravados = 0;
    this.totalNoGravados = 0;
    this.totalIva = 0;
    this.totalGeneral = 0;

    this.carrito.forEach(item => {
      const precioSinIva = item.valorUnitario * item.cantidad;
      const ivaCalculado = precioSinIva * (item.iva / 100);
      const totalLinea = precioSinIva + ivaCalculado;

      item.valorAntesIva = precioSinIva;
      item.valorIva = ivaCalculado;
      item.totalLinea = totalLinea;

      this.totalProductos++;
      this.totalGeneral += totalLinea;
      this.totalIva += ivaCalculado;

      if (item.iva > 0) {
        this.totalGravados += precioSinIva;
      } else {
        this.totalNoGravados += precioSinIva;
      }
    });

    this.totalGravados = parseFloat(this.totalGravados.toFixed(2));
    this.totalNoGravados = parseFloat(this.totalNoGravados.toFixed(2));
    this.totalIva = parseFloat(this.totalIva.toFixed(2));
    this.totalGeneral = parseFloat(this.totalGeneral.toFixed(2));
  }



  buscarCliente(event: any) {
    const nombreBuscado = event.target.value;
    const clienteEncontrado = this.listaClientes.find(c => c.nombre.toLowerCase() === nombreBuscado.toLowerCase());
    this.clienteSeleccionadoId = clienteEncontrado ? clienteEncontrado.id : null;
  }

  finalizarVenta() {
    if (!this.clienteSeleccionadoId) {
      alert('Debes seleccionar un cliente.');
      return;
    }
    if (this.carrito.length === 0) {
      alert('El carrito está vacío.');
      return;
    }

    let numeroFacturaFinal: string;

    if (this.numeroFactura === 'PENDIENTE') {

      numeroFacturaFinal = `TEMP-${new Date().getTime()}`;
    } else {
      numeroFacturaFinal = this.numeroFactura;
    }


    const ventaData = {
      numero_factura: numeroFacturaFinal,
      fecha_hora: new Date().toISOString(),
      cliente: this.clienteSeleccionadoId,
      forma_pago: this.formaPago.toUpperCase(),
      sub_total: this.totalGravados + this.totalNoGravados,
      total_iva: this.totalIva,
      total_general: this.totalGeneral,
      estado: 'COMPLETADA',
      usuario_vendedor: this.ID_USUARIO_VENDEDOR,
    };

    this.ventasService.crearVenta(ventaData).subscribe({
      next: (ventaCreada) => {
        console.log('Venta creada exitosamente:', ventaCreada);
        this.crearDetallesVenta(ventaCreada.id);
      },
      error: (err) => {
        console.error('Error al crear la venta:', err);
        alert('Hubo un error al finalizar la venta (Encabezado). Revisa la consola.');
      }
    });
  }

  crearDetallesVenta(ventaId: number) {
    const detallesObservables = this.carrito.map(item => {
      const detalleData = {
        venta: ventaId,
        producto: item.id,
        codigo_producto: item.codigo,
        cantidad: item.cantidad,
        valor_unitario: item.valorUnitario,
        porcentaje_iva: item.iva,
        valor_sin_iva: item.valorAntesIva,
        valor_iva: item.valorIva,
        valor_total: item.totalLinea,
      };
      return this.ventasService.crearVentaDetalle(detalleData);
    });

    forkJoin(detallesObservables).subscribe({
      next: (resultados) => {
        alert('Venta completada exitosamente');
        this.cancelarVenta();
      },
      error: (err) => {
        console.error('Error al crear uno o más detalles de venta:', err);
        alert('Venta creada, pero hubo errores al guardar algunos detalles. Revisa la consola.');
      }
    });
  }

  cancelarVenta() {
    this.clienteSeleccionadoNombre = '';
    this.clienteSeleccionadoId = null;
    this.productoBusqueda = '';
    this.carrito = [];
    this.formaPago = 'CONTADO';
    this.recalcularCarrito();
  }
}
