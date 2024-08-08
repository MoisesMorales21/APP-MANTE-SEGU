import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {
  incidents: any[] = [];
  user: any = {};
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  
  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadUserData();
  }

  ionViewWillEnter() { 
    this.loadIncidents();
  }

  async loadIncidents() {
    try {
      const allIncidents = await this.firebaseService.getIncidents();
      this.incidents = allIncidents.filter(incident => 
        incident.status !== 'finalizado' && 
        (incident.status === 'read' || !incident.status) &&
        incident.type === this.user.Cargo
      );

    } catch (error) {
      console.error('Error al recuperar incidentes:', error);
    }
  }

  viewIncident(incident: any) {
    this.router.navigate(['./main/incidente', incident.id]);
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
          this.loadIncidents();
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

  getIncidentColor(incident: any): string {           

    if (incident.status === 'read') {
      return 'medium';
    }
    if (incident.status === 'finalizado') {
      return 'light';
    }
    switch (incident.criticidad) {            
      case 'Baja':
        return 'success';
      case 'Media':
        return 'warning';
      case 'Alta':
        return 'danger';
      default:
        return 'medium';
    }
  }  
}


