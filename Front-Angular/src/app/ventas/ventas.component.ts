import { Component, OnInit } from '@angular/core';
import {VentasService} from "./ventas.service";

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {




  // Encabezado
  fechaActual: string = '';
  clienteSeleccionadoNombre: string = '';
  listaClientes: any[] = [];
  numeroFactura: string = '';
  formaPago: string = 'contado';

  // Productos
  listaProductos: any[] = [];
  productoBusqueda: string = '';
  carrito: any[] = [];

  // Totales
  totalProductos: number = 0;
  totalGravados: number = 0;
  totalNoGravados: number = 0;
  totalIva: number = 0;
  totalGeneral: number = 0;

  constructor(private ventasService: VentasService) {}

  ngOnInit(): void {
    // Inicializaciones mínimas
  }

  // --- Métodos sin lógica solo para el HTML ---
  buscarCliente(event: any) {}
  buscarProducto(event: any) {}
  cambiarCantidad(index: number) {}
  eliminarItem(index: number) {}
  finalizarVenta() {}
  cancelarVenta() {}
}

