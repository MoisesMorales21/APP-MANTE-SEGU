import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  user: any = {};

  router = inject(Router);
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService)
  currentPath: string = '';

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (event?.url) this.currentPath = event.url;
    })
    this.loadUserData();
  }

  async loadUserData() {
    const email = this.utilsSvc.getFromLocalStorage('user')?.email;
    if (email) {
      const loading = await this.utilsSvc.loading();
      await loading.present();
      try {
        const user = await this.firebaseSvc.getUserByEmail(email);
        if (user) {
          this.user = user;
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
          icon: 'alert-circle-outline'
        });
      } finally {
        loading.dismiss();
      }
    }
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }

  navigateToEditProfile() {
    this.router.navigate(['/editarperfil']);
  }

  async signOut() {
    try {
      this.utilsSvc.removeItem('user');  // Correct method to clear local storage
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });  // Redirect to login page
    } catch (error) {
      console.error('Error during sign out:', error);
      this.utilsSvc.presentToast({
        message: 'Error during sign out',
        duration: 2000,
        color: 'secondary',
        position: 'middle',
        icon: 'alert-circle-outline'
      });
    }
  }
  
  pages = 
  [
    {title: 'Historial', url: '/main/notifinal'},
    {title: 'Notificaciones', url: '/main/notificaciones'}
  ]
}

