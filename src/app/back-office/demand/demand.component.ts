import { Component, OnInit } from '@angular/core';
import { DemandService } from '../../services/demand.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-demand',
  templateUrl: './demand.component.html',
  styleUrls: ['./demand.component.css']
})
export class DemandComponent implements OnInit {
  demands: any[] = [];

  constructor(private demandService: DemandService) {}

  ngOnInit(): void {
    this.getAllDemands();
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

}
