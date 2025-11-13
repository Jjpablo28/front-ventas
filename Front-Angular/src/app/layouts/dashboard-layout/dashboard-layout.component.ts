import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent {

  sidebarOpen = false;
  user = localStorage.getItem("name");
  constructor(private router: Router) {
    // Cierra la sidebar al navegar a otra ruta
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && this.sidebarOpen) {
        this.sidebarOpen = false;
      }
    });
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
