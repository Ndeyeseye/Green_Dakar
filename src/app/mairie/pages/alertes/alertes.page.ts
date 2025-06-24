import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { NgIf, NgFor } from '@angular/common';
import { map } from 'rxjs/operators';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-alertes',
  templateUrl: './alertes.page.html',
  styleUrls: ['./alertes.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    NgIf,
    NgFor
  ]
})
export class AlertesPage implements OnInit {
  alertes$!: Observable<any[]>;

  constructor(private firestore: Firestore) {}

  ngOnInit() {
  const alertesRef = collection(this.firestore, 'signalements');
  this.alertes$ = collectionData(alertesRef, { idField: 'id' }).pipe(
  map(alertes => alertes.map(alerte => ({
    ...alerte,
    date: (alerte['date'] as Timestamp)?.toDate()
  })))
);
  }
}
