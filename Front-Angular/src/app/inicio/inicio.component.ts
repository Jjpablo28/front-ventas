import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import ApexCharts from 'apexcharts';
import {InicioService} from "./inicio.service";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements AfterViewInit {

  constructor(private inicioService : InicioService) {}



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
          chart.el.addEventListener(
            'touchstart',
            (e: any) => e.stopPropagation(),
            { passive: false }
          );
        }
      }
    },

    series: [{
      name: "Series 1",
      data: [80, 50, 30, 40]
    }],

    labels: ["Peluche", "Juego de mesa", "Construcción", "Videojuegos"],

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
        data: [15, 20, 15, 30, 10, 18]
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
      categories: ["Enero","Febrero","Marzo","Abril","May","June"],

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
          { passive: false }
        );
      }
    }
  };

  ngAfterViewInit() {
    this.chart = new ApexCharts(this.chartElement.nativeElement, this.chartOptions);
    this.chart.render();
    this.radar = new ApexCharts(this.radarChartElement.nativeElement, this.radarOptions);
    this.radar.render();
  }
}
