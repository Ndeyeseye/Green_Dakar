import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonChip,
  IonButton,
  IonThumbnail,
  IonImg
} from '@ionic/angular/standalone';

import { Firestore, collection, collectionData,query, orderBy, limit } from '@angular/fire/firestore';
import { Chart, registerables } from 'chart.js';
import { Observable } from 'rxjs';
import ChartDataLabels from 'chartjs-plugin-datalabels';


Chart.register(...registerables,ChartDataLabels);

@Component({
  selector: 'app-signalements',
  templateUrl: './signalements.page.html',
  styleUrls: ['./signalements.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonChip,
    IonButton,
    IonThumbnail,
    IonImg
  ]
})
export class SignalementsPage implements OnInit {
  @ViewChild('statChart') statChartRef!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

 signalements: any[] = [];

  constructor(private firestore: Firestore) {}
  

 ngOnInit() {
  
  const ref = collection(this.firestore, 'signalements');
  collectionData(ref, { idField: 'id' }).subscribe(data => {
    // Trier les signalements par date décroissante
    this.signalements = data.sort((a: any, b: any) => {
      const dateA = new Date(a.date || a.createdAt?.seconds * 1000 || 0).getTime();
      const dateB = new Date(b.date || b.createdAt?.seconds * 1000 || 0).getTime();
      return dateB - dateA;
    });

    // Graphique
    const stats = this.countByType(this.signalements);
    this.renderChart(stats);
    
  });
}


  countByType(data: any[]): { [key: string]: number } {
    const countMap: { [key: string]: number } = {};
    for (const s of data) {
      const type = s.typeNuisance || 'Autre';
      countMap[type] = (countMap[type] || 0) + 1;
    }
    return countMap;
  }

  renderChart(stats: { [key: string]: number }) {
    if (this.chart) this.chart.destroy();

    const ctx = this.statChartRef.nativeElement;
    const total = Object.values(stats).reduce((sum, val) => sum + val, 0);
    const labelsWithPercentages = Object.entries(stats).map(([key, value]) => {
      const percent = ((value / total) * 100).toFixed(1);
      return' ${key} (${percent}%)';
    });
    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(stats),
        datasets: [{
          label: 'Signalements par type',
          data: Object.values(stats),
          backgroundColor: ['#4CAF50', '#FF9800', '#2196F3', '#E91E63', '#9C27B0']
        }]
      },
      options: {
        responsive: true,
        plugins: {
  legend: { position: 'bottom' },
  datalabels: {
    formatter: (value: number, context: any) => {
      const total = context.chart.data.datasets[0].data.reduce((a: number, b: number) => a + b, 0);
      const percentage = (value / total * 100).toFixed(1);
      return percentage + '%';
    },
    color: '#fff',
    font: {
      weight: 'bold'
    }
  }
}

      }
    });
  }
}
