import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {PasswordService} from "./password.service";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  standalone: false,
  styleUrl: './password.component.scss'
})
export class PasswordComponent {


  email: string = ''; // Variable para almacenar el correo electrónico

  constructor(private router: Router, private passwordService: PasswordService) {
  } // Inyecta el Router

  onSubmit(): void {
    // Aquí es donde implementarías la lógica para enviar el correo
    // a tu backend para restablecer la contraseña.
    console.log('Solicitud de restablecimiento de contraseña para:', this.email);

    // En un escenario real, harías una llamada a un servicio:
    // this.authService.requestPasswordReset(this.email).subscribe(
    //   response => {
    //     alert('Si tu correo está registrado, recibirás un enlace para restablecer tu contraseña.');
    //     this.router.navigate(['/login']); // Redirige de vuelta al login
    //   },
    //   error => {
    //     console.error('Error al solicitar restablecimiento:', error);
    //     alert('Hubo un error al procesar tu solicitud. Intenta de nuevo.');
    //   }
    // );

    // Por ahora, solo un mensaje de alerta y redirigir
    alert('Si tu correo está registrado, recibirás un enlace para restablecer tu contraseña.');
    this.router.navigate(['/login']); // Redirige de vuelta al login después de enviar
  }
}
