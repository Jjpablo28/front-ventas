import {Component} from '@angular/core';
import {InicioService} from "../inicio/inicio.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private inicioService: InicioService, private router: Router) {
  }

  login() {
    if (!this.username || !this.password) {
      alert('Los campos no pueden estar vacios');

    }else {
      alert('Bienvenido ' + this.username);
      // @ts-ignore
      localStorage.setItem("name",this.username);

      this.router.navigate(['/inicio']);
    }


  }

}
