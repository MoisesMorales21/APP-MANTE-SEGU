import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

firesabeSvc = inject(FirebaseService);
UtilsScv = inject(UtilsService)

  ngOnInit() {
  }

  async submit(){
    if (this.form.valid) {

      const loading = await this.UtilsScv.loading();
      await loading.present();

      this.firesabeSvc.sendRecoveryEmail(this.form.value.email).then(res => {

        this.UtilsScv.presentToast({
          message: 'Correo enviado con exito',
          duration: 1500,
          color: 'danger',
          position: 'middle',
          icon: 'mail-autline'
        })

        this.UtilsScv.routink('/login');
        this.form.reset();

      }).catch(error => {
        console.log(error);

        this.UtilsScv.presentToast({
          message: error.message,
          duration: 1500,
          color: 'danger',
          position: 'middle',
          icon: 'alert-circle-autline'
        })

      }).finally(() => {
        loading.dismiss();
      })
    }
  }

}
