import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseService } from "../../services/response.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-response-form',
  templateUrl: './response-form.component.html',
  styleUrls: ['./response-form.component.css']
})
export class ResponseFormComponent implements OnInit {

  demandId!: number;
  responseForm!: FormGroup;  // Declare FormGroup

  constructor(
    private route: ActivatedRoute,
    private responseService: ResponseService,
    private router: Router,
    private fb: FormBuilder  // Inject FormBuilder
  ) { }

  ngOnInit() {
    this.demandId = this.route.snapshot.params['id'];

    // Initialize the form group with form controls
    this.responseForm = this.fb.group({
      comment: ['', Validators.required],  // Comment control with required validation
      status: ['Pending', Validators.required]  // Status control with default value
    });
  }

  // Method to submit the response form
  submitResponse() {
    if (this.responseForm.valid) {
      const responseData = this.responseForm.value;
      console.log('Form Data:', responseData);  // Log the data to check
      this.responseService.addResponse(this.demandId, responseData.comment, responseData.status).subscribe(() => {
        this.router.navigate(['/back-office/demand']);
      });
    }
  }

}
