import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy, OnInit
} from '@angular/core';
import ApexCharts from 'apexcharts';
import {ReportesService} from './reportes.service';
import {window} from "rxjs";


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements AfterViewInit, OnDestroy, OnInit {

  // Guardamos todas las instancias para poder destruirlas
  private charts: ApexCharts[] = [];

  constructor(private reportesService: ReportesService) {

    // Fix del error "Unable to preventDefault inside passive event listener"
    (window as any).Apex = {
      chart: {
        events: {
          touchMove: () => {
          },
          mouseMove: () => {
          }
        }
      }
    };
  }

  departamentos: any[] = [];

  ngOnInit(): void {
    this.cargarDepartamentos();
  }





  @ViewChild('ventasMesChart') ventasMesChart!: ElementRef;
  @ViewChild('productosVendidosChart') productosVendidosChart!: ElementRef;
  @ViewChild('ventasDepartamentoChart') ventasDepartamentoChart!: ElementRef;
  @ViewChild('gravadasChart') gravadasChart!: ElementRef;
  @ViewChild('tipoPagoChart') tipoPagoChart!: ElementRef;

  ngAfterViewInit(): void {
    console.log("INIT REPORTES");

    this.cargarVentasMes();
    this.cargarProductosVendidos();
    this.cargarVentasDepartamento();
    this.cargarGravadas();
    this.cargarTipoPago();
  }

  ngOnDestroy(): void {
    console.log("DESTRUYENDO CHARTS");

    this.charts.forEach(chart => {
      try {
        chart.destroy();
      } catch {
      }
    });

    this.charts = [];
  }

  // ================================
  //    6.1 Ventas por mes
  // ================================
  cargarVentasMes() {
    const options = {
      chart: {
        type: 'line',
        height: 330,
        zoom: {enabled: false},
        toolbar: {show: false},
        events: {
          mounted: (chart: { el: HTMLElement }) => {
            const svg = chart.el.querySelector('svg');
            if (svg instanceof SVGSVGElement) {
              svg.addEventListener(
                'wheel',
                (e: WheelEvent) => {
                  e.preventDefault();
                },
                {passive: false}
              );
            }
          }

        }
      },
      series: [{name: 'Ventas', data: [45, 60, 80, 75, 95, 110, 80, 180, 90, 60, 90]}],
      xaxis: {categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']},
      stroke: {curve: 'smooth'}
    };

    setTimeout(() => {
      const chart = new ApexCharts(this.ventasMesChart.nativeElement, options);
      chart.render();
      this.charts.push(chart);
    }, 50);
  }


  // ================================
  //    6.2 Productos más vendidos
  // ================================
  cargarProductosVendidos() {
    const options = {
      chart: {type: 'bar', height: 330},
      series: [{name: 'Cantidad', data: [120, 90, 75, 60]}],
      xaxis: {categories: ['Oso', 'Carro', 'Puzzle', 'Construcción']}
    };

    const chart = new ApexCharts(
      this.productosVendidosChart.nativeElement,
      options
    );
    chart.render();
    this.charts.push(chart);
  }

  // ================================
  //    6.3 Ventas por departamento
  // ================================
  cargarDepartamentos() {
    this.reportesService.getDepartamentosNames().subscribe({
      next: (nombres) => {
        this.departamentos = nombres;  // Asignamos los nombres de los departamentos

        // Una vez que los departamentos están cargados, cargamos las ventas
        this.cargarVentasDepartamento();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }



  cargarVentasDepartamento() {
    // Asegúrate de que this.departamentos esté completamente cargado antes de crear el gráfico
    if (this.departamentos.length > 0) {
      const options = {
        chart: {
          type: 'bar',
          height: 330
        },
        series: [{
          name: 'Ventas',
          data: [33, 31, 119, 111, 8, 13, 141, 97, 126, 51, 115, 3, 50, 66, 101, 121, 68, 148, 3, 120, 91, 60, 10, 79, 43, 32, 44, 37, 136, 110, 35, 143, 121]
          // Aquí puedes cambiar los datos según sea necesario
        }],
        xaxis: {
          categories: this.departamentos  // Usamos los nombres de los departamentos como categorías
        }
      };

      // Crear el gráfico de ApexCharts
      const chart = new ApexCharts(
        this.ventasDepartamentoChart.nativeElement,
        options
      );
      chart.render();  // Renderizamos el gráfico
    }
  }

  // ================================
  //    6.4 Gravadas vs no gravadas
  // ================================
  cargarGravadas() {
    const options = {
      chart: {type: 'pie', height: 330},
      series: [70, 30],
      labels: ['Gravadas', 'No Gravadas']
    };

    const chart = new ApexCharts(this.gravadasChart.nativeElement, options);
    chart.render();
    this.charts.push(chart);
  }

  // ================================
  //    6.5 Tipo de pago
  // ================================
  cargarTipoPago() {
    const options = {
      chart: {type: 'donut', height: 330},
      series: [40, 35, 25],
      labels: ['Credito', 'Contado', 'Mixto']
    };

    const chart = new ApexCharts(
      this.tipoPagoChart.nativeElement,
      options
    );
    chart.render();
    this.charts.push(chart);
  }


}
