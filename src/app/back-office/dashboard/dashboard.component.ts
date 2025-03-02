import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  fields: string[] = ['IT', 'Marketing', 'HR', 'Finance']; // Example fields
  statuses: string[] = ['Pending', 'Approved', 'Rejected']; // Example statuses
  selectedField: string = '';
  selectedStatus: string = '';

  statistics = {
    activeDemands: 0,
    approvedDemands: 0,
    pendingDemands: 0,
  };


  chartLabels: string[] = ['Active', 'Approved', 'Pending'];
  chartData: number[] = [0, 0, 0];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchStatistics();
  }

  fetchStatistics(): void {
    let params: any = {};
    if (this.selectedField) params.field = this.selectedField;
    if (this.selectedStatus) params.status = this.selectedStatus;

    this.http.get<any>('http://localhost:8089/internshipDemands/api/demands/statistics', { params })
      .subscribe(response => {
        this.statistics = {
          activeDemands: response.activeDemands || 0,
          approvedDemands: response.approvedDemands || 0,
          pendingDemands: response.pendingDemands || 0
        };

        // Update chart data
        this.chartData = [
          this.statistics.activeDemands,
          this.statistics.approvedDemands,
          this.statistics.pendingDemands
        ];
      }, error => {
        console.error('Error fetching statistics:', error);
      });
  }
}
