import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DemandService} from "../../services/demand.service";
import {EvaluationService} from "../../services/evaluation.service";
import {ResponseService} from "../../services/response.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-demand-details',
  templateUrl: './demand-details.component.html',
  styleUrls: ['./demand-details.component.css'],
  providers: [DatePipe]
})
export class DemandDetailsComponent implements OnInit {
  demand: any;
  evaluations: any[] = [];responses: any[] = [];
  newEvaluation = { rating: 5, comment: '' };
  userId = 1; // Replace with dynamic user ID from authentication system

  constructor(
    private route: ActivatedRoute,
    private demandService: DemandService,
    private evaluationService: EvaluationService,
    private responseService: ResponseService,private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    const demandId = this.route.snapshot.paramMap.get('id');
    if (demandId) {
      this.loadDemandDetails(+demandId);
      this.loadEvaluations(+demandId);
      this.loadResponses(+demandId);
    }
  }
  loadResponses(demandId: number): void {
    this.responseService.getResponsesByDemand(demandId).subscribe(responses => {
      this.responses = responses;
    });
  }
  formatDate(date: number): string {
    return <string>this.datePipe.transform(date, 'short');  // Use 'short' or any other format you need
  }

  loadDemandDetails(demandId: number) {
    this.demandService.getDemandById(demandId).subscribe((data) => {
      this.demand = data;
    });
  }

  loadEvaluations(demandId: number) {
    this.evaluationService.getEvaluations(demandId).subscribe((data) => {
      this.evaluations = data;
    });
  }

  submitEvaluation() {
    if (!this.newEvaluation.comment.trim()) {
      alert('Please enter a comment.');
      return;
    }

    const demandId = this.demand.id;
    this.evaluationService.addEvaluation(demandId, this.newEvaluation.rating, this.newEvaluation.comment)
      .subscribe({
        next: (response) => {
          this.evaluations.push(response); // Update the UI with new evaluation
          this.newEvaluation = { rating: 5, comment: '' }; // Reset form
        },
        error: (err) => {
          console.error('Error adding evaluation:', err);
        },
      });
  }
}
