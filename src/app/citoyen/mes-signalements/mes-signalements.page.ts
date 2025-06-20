import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SignalementService } from '../../services/signalement.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-mes-signalements',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './mes-signalements.page.html',
  styleUrls: ['./mes-signalements.page.scss'],
})
export class MesSignalementsPage implements OnInit {
  signalements: any[] = [];

  constructor(
    private signalementService: SignalementService,
    private auth: Auth
  ) {}

  async ngOnInit() {
    const uid = this.auth.currentUser?.uid;
    if (!uid) return;

    this.signalements = await this.signalementService.getSignalementsByUser(uid);
  }
}
