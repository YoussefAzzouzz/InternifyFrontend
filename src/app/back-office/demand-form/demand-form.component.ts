import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandService } from '../../services/demand.service';

@Component({
  selector: 'app-demand-form',
  templateUrl: './demand-form.component.html',
  styleUrls: ['./demand-form.component.css']
})
export class DemandFormComponent implements OnInit {
  demandForm: FormGroup;
  isEditMode: boolean = false;
  demandId: number | null = null;

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
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.demandId = +id;
        this.loadDemand(this.demandId);
      }
    });
  }

  loadDemand(id: number): void {
    this.demandService.getDemandById(id).subscribe(demand => {
      this.demandForm.patchValue(demand);
    });
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.demandService.updateDemand(this.demandId!, this.demandForm.value).subscribe(() => {
        this.router.navigate(['/back-office/demand']); // Redirect to demand list
      });
    } else {
      this.demandService.createDemand(this.demandForm.value).subscribe(() => {
        this.router.navigate(['/back-office/demand']); // Redirect to demand list
      });
    }
  }
}
