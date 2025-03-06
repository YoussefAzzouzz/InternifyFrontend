import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandService } from '../../services/demand.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-demand-form',
  templateUrl: './demand-form.component.html',
  styleUrls: ['./demand-form.component.css']
})
export class DemandFormComponent implements OnInit, AfterViewInit {
  demandForm: FormGroup;
  isEditMode: boolean = false;
  demandId: number | null = null;
  map!: L.Map;
  marker!: L.Marker;
  isMapInitialized: boolean = false; // Flag to track map initialization

  constructor(
    private fb: FormBuilder,
    private demandService: DemandService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.demandForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      field: ['', Validators.required],
      status: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.demandId = +id;
        this.loadDemand(this.demandId);
      } else {
        this.initMap(36.8065, 10.1815); // Default location for new demand
      }
    });
  }

  ngAfterViewInit(): void {
    if (!this.isEditMode) {
      this.initMap(36.8065, 10.1815); // Initialize map only if adding a new demand
    }
  }

  private initMap(lat: number, lng: number) {
    if (this.isMapInitialized) return; // Prevent duplicate map initialization
    this.isMapInitialized = true;

    this.map = L.map('map').setView([lat, lng], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.marker = L.marker([lat, lng], { draggable: true }).addTo(this.map);

    this.marker.on('dragend', (event: any) => {
      const position = event.target.getLatLng();
      this.demandForm.patchValue({
        latitude: position.lat,
        longitude: position.lng
      });
    });
  }

  private loadDemand(id: number): void {
    this.demandService.getDemandById(id).subscribe(demand => {
      this.demandForm.patchValue(demand);

      const lat = demand.latitude || 36.8065;
      const lng = demand.longitude || 10.1815;

      if (this.isMapInitialized) {
        this.marker.setLatLng([lat, lng]);
        this.map.setView([lat, lng], 10);
      } else {
        this.initMap(lat, lng);
      }
    });
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.demandService.updateDemand(this.demandId!, this.demandForm.value).subscribe(() => {
        this.navigateToDemandList();
      });
    } else {
      this.demandService.createDemand(this.demandForm.value).subscribe(() => {
        this.navigateToDemandList();
      });
    }
  }

  private navigateToDemandList(): void {
    const currentUrl = this.router.url;
    if (currentUrl.includes('/front-office')) {
      this.router.navigate(['/front-office/demand']);
    } else {
      this.router.navigate(['/back-office/demand']);
    }
  }
}
