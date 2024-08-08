import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incidente',
  templateUrl: './incidente.page.html',
  styleUrls: ['./incidente.page.scss'],
})
export class IncidentePage implements OnInit {
  incident: any;
  incidentPhotoUrl: string | undefined;
  incidentId: string;
  user: any;

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.loadIncident();
  }


  async loadIncident() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      try {
        this.incident = await this.firebaseService.getDocument(`incidents/${id}`);
        console.log('Incidente cargado:', this.incident);
        if (this.incident.photo) {
          this.incidentPhotoUrl = await this.firebaseService.getDownloadURL(this.incident.photo);
        }

      } catch (error) {
        console.error('Error al cargar el incidente:', error);
      }
    }
  }
  async loadIncidentPhoto(photoUrl: string) {
    try {
      this.incidentPhotoUrl = photoUrl;
    } catch (error) {
      console.error('Error al cargar la foto del incidente:', error);
    }
  }

  async markAsRead() {
    if (this.incident && this.incident.id) {
      try {
        this.incident.status = 'read';
        await this.firebaseService.updateDocument(`incidents/${this.incident.id}`, { status: 'read' });
        this.navigateToNotifications();
      } catch (error) {
        console.error('Error al marcar como leído:', error);
      }
    }
  }

  navigateToNotifications() {
    this.router.navigate(['./main/notificaciones']).then(() => {
      window.location.reload();
    });
  }
 
  async markAsFinished() {
    if (this.incident && this.incident.id) {
      try {
        this.incident.status = 'finalizado';
        await this.firebaseService.updateDocument(`incidents/${this.incident.id}`, { status: 'finalizado' });
        this.navigateToNotifications();
      } catch (error) {
        console.error('Error al marcar como finalizado:', error);
      }
    }
  }

}
