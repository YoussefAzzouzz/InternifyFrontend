import { Component, OnInit } from '@angular/core';
import { DemandService } from '../../services/demand.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import * as L from "leaflet";

@Component({
  selector: 'app-demand-list',
  templateUrl: './demand-list.component.html',
  styleUrls: ['./demand-list.component.css'],
  providers: [DatePipe]
})
export class DemandListComponent implements OnInit {
  demands: any[] = [];
  searchQuery: string = '';
  fields: string[] = ['IT', 'Marketing', 'HR', 'Finance']; // Example field values, you can fetch these from the backend
  statuses: string[] = ['Pending', 'Accepted', 'Rejected']; // Example status values, you can fetch these from the backend
  selectedField: string = '';
  selectedStatus: string = '';
  statistics: any = null;


  constructor(private demandService: DemandService, private datePipe: DatePipe, private http: HttpClient) {}

  formatDate(date: number): string {
    return <string>this.datePipe.transform(date, 'short'); // Use 'short' or any other format you need
  }

  ngOnInit(): void {
    this.loadDemands(); // Load demands and initialize the map
    this.getStatistics();
  }

  initMap(demands: any[]): void {
    const map = L.map('map').setView([36.8065, 10.1815], 10); // Default location (Tunis)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Create a custom red icon for the current location marker
    const redIcon = L.icon({
      iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Paomedia_small-n-flat_map-marker.svg', // URL for red marker icon
      iconSize: [25, 41], // Size of the icon
      iconAnchor: [12, 41], // Anchor point (bottom center of the icon)
      popupAnchor: [1, -34], // Popup anchor offset
      shadowSize: [41, 41], // Shadow size
    });

    // Handle Geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        // Set the map's view to the current location
        map.setView([lat, lng], 13);

        // Add a marker for the current location with the red icon
        L.marker([lat, lng], { icon: redIcon })
          .addTo(map)
          .bindPopup('You are here!')
          .openPopup();

      }, (error) => {
        console.error('Error getting geolocation', error);
        alert('Geolocation failed, showing default location.');
      });
    }

    // Add markers for demands
    demands.forEach((demand) => {
      L.marker([demand.latitude, demand.longitude])
        .addTo(map)
        .bindPopup(`<b>${demand.title}</b><br>${demand.description}`);
    });
  }


  loadDemands() {
    this.demandService.getAllDemands().subscribe((demands) => {
      this.demands = demands;
      this.initMap(demands); // Initialize the map with the fetched demands
    });
  }

  searchDemands() {
    if (this.selectedField) {
      this.demandService.searchDemandsByField(this.selectedField).subscribe((data) => {
        this.demands = data;
        this.initMap(this.demands); // Reinitialize the map with the filtered demands
      });
    }
  }

  getStatistics(): void {
    let params: any = {};
    if (this.selectedField) {
      params.field = this.selectedField;
    }
    if (this.selectedStatus) {
      params.status = this.selectedStatus;
    }

    this.http.get<any>('http://localhost:8089/internshipDemands/api/demands/statistics', { params })
      .subscribe(
        (response) => {
          this.statistics = response; // Store the response to display the statistics
        },
        (error) => {
          console.error('Error fetching statistics:', error);
        }
      );
  }

  getAllDemands() {
    this.demandService.getAllDemands().subscribe(data => {
      this.demands = data;
    });
  }

  deleteDemand(id: number) {
    this.demandService.deleteDemand(id).subscribe(() => {
      this.getAllDemands(); // Refresh list after delete
    });
  }

  sortOrder: string = ''; // Sorting order (asc/desc)

  // Sort demands by date
  currentPage = 1; // Default page
  itemsPerPage = 2; // Items per page
  sortDemands() {
    if (this.sortOrder === 'asc') {
      this.demands.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (this.sortOrder === 'desc') {
      this.demands.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  }
}
