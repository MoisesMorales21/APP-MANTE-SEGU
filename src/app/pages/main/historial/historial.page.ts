import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  incident: any;

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadIncident();
  }

  async loadIncident() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      try {
        this.incident = await this.firebaseService.getDocument(`incidents/${id}`);
      } catch (error) {
        console.error('Error al cargar el incidente:', error);
      }
    }
  }

  navigateTohistorial() {
    this.router.navigate(['./main/notificaciones']);
  }

}
