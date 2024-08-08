import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() { }

  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;

      try {
        const user = await this.firebaseSvc.getUserByEmail(email);
        if (user && user.password === password) {
          if (user.isAdmin) {
            this.utilsSvc.routink('/main/salas');  // Redirige a la página de administración
          } else {
            this.getUserInfo(email);
          }
        } else {
          throw new Error('Verifica tu correo o contraseña');
        }
      } catch (error: any) {
        console.log(error);

        this.utilsSvc.presentToast({
          message: error.message || 'Has tenido un error: Verifica tu correo o contraseña',
          duration: 2000,
          color: 'secondary',
          position: 'middle',
        });
      } finally {
        loading.dismiss();
      }
    }
  }

  async getUserInfo(email: string) {
    const loading = await this.utilsSvc.loading();
    await loading.present();

    try {
      const user = await this.firebaseSvc.getUserByEmail(email);
      if (user) {
        this.utilsSvc.SaveInLocalStorage('user', user);
        this.utilsSvc.routink('/main/notificaciones');
        this.form.reset();
      } else {
        throw new Error('Usuario no encontrado');
      }
    } catch (error: any) {
      console.log(error);

      this.utilsSvc.presentToast({
        message: error.message,
        duration: 1500,
        color: 'secondary',
        position: 'middle',
      });
    } finally {
      loading.dismiss();
    }
  }
}
