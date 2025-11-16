import {Component, ViewChild, ElementRef, AfterViewInit, OnInit} from '@angular/core';
import ApexCharts from 'apexcharts';
import {InicioService} from "./inicio.service";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements AfterViewInit, OnInit {


  constructor(private inicioService: InicioService) {
  }

  nombresCategorias: any[] = [];
  categorias: any[] = [];

  ngOnInit(): void {
    this.cargarLineas();

  }

  cargarLineas() {
    this.inicioService.getLineas().subscribe({
      next: (data) => {
        this.categorias = data;

        this.nombresCategorias = [];

        for (let i = 0; i < data.length; i++) {
          this.nombresCategorias.push(this.categorias[i].nombre); // Agregar el nombre
        }
        this.initChart();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  @ViewChild('chart') chartElement!: ElementRef;

  @ViewChild('radarChart') radarChartElement!: ElementRef;

  radar!: ApexCharts;

  radarOptions: any = {
    chart: {
      height: 420,
      type: "radar",
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      events: {
        mounted: (chart: any) => {

          chart.el.removeEventListener(
            'touchstart',
            (e: any) => e.stopPropagation(),
            { passive: false }
          );
        }
      }
    },
    series: [{
      name: "Series 1",
      data: [80, 50, 30, 40, 60, 100]
    }],
    labels: this.nombresCategorias,
    yaxis: {
      show: false,
    },
    stroke: {
      width: 2,
      colors: ["#247BA0"]
    },
    fill: {
      opacity: 0.2,
      colors: ["#247BA0"]
    }
  };



  chart!: ApexCharts;

  chartOptions: any = {
    chart: {
      height: 350,
      type: "line",
      stacked: false
    },
    dataLabels: {
      enabled: false
    },
    colors: ["#2c3e50"],
    series: [
      {
        name: "Ventas",
        data: [15, 20, 15, 30, 10, 18,50,30,40,90,38,42]
      },

    ],
    stroke: {
      width: [4, 4]
    },
    plotOptions: {
      bar: {
        columnWidth: "20%"
      }
    },
    xaxis: {
      categories: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],

    },
    yaxis: [
      {
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true,
          color: "#3498db"
        },
        labels: {
          style: {
            colors: "#3498db"
          }
        },
        title: {
          text: "Ventas",
          style: {
            color: "#3498db"
          }
        }
      },
      {
        opposite: true,
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true,
          color: "#247BA0"
        },
        labels: {
          style: {
            colors: "#247BA0"
          }
        },

      }
    ],
    tooltip: {
      shared: false,
      intersect: true,
      x: {
        show: false
      }
    },
    legend: {
      horizontalAlign: "left",
      offsetX: 40
    },
    events: {
      mounted: (chart: any) => {
        chart.el.addEventListener(
          'touchstart',
          (e: any) => e.stopPropagation(),
          //{passive: true}
        );
      }
    }
  };
  initChart() {
    // Verificamos si el gráfico ya está inicializado, si no lo está, lo inicializamos
    if (!this.radar) {
      this.radar = new ApexCharts(this.radarChartElement.nativeElement, this.radarOptions);
      this.radar.render();
    } else {
      // Si ya existe, actualizamos las opciones del gráfico
      this.radar.updateOptions({
        labels: this.nombresCategorias,
      });
    }
  }

  ngAfterViewInit() {
    this.chart = new ApexCharts(this.chartElement.nativeElement, this.chartOptions);
    this.chart.render();
    this.radar = new ApexCharts(this.radarChartElement.nativeElement, this.radarOptions);
    this.radar.render();
  }


}
