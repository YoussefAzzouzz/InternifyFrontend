import { Component, OnInit } from '@angular/core';
import { ReportService, Report } from '../../services/report.service';
import {Chart} from "chart.js";

@Component({
  selector: 'app-view-reports',
  templateUrl: './view-reports.component.html',
  styleUrls: ['./view-reports.component.css']
})
export class ViewReportsComponent implements OnInit {
  reports: Report[] = [];
  chart: any;
  reportStats = { validated: 0, notValidated: 0 };
  currentPage: number = 1; // Track current page
  itemsPerPage: number = 3; // Show only 3 rows per page

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.reportService.getAllReports().subscribe(
      data => {
        this.reports = data;
      },
      error => console.error('Error fetching reports', error)
    );

    this.reportService.getReportStats().subscribe(
      stats => {
        this.reportStats = stats;
        this.createChart();
      },
      error => console.error('Error fetching stats', error)
    );
  }
  pageChanged(event: any) {
    this.currentPage = event.page;
  }

  createChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart("reportChart", {
      type: 'bar',
      data: {
        labels: ['Validated', 'Not Validated'],
        datasets: [{
          label: 'Reports',
          data: [this.reportStats.validated, this.reportStats.notValidated],
          backgroundColor: ['#4CAF50', '#F44336'], // green and red
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }



  getValidatedClass(isValidated: boolean): string {
    return isValidated ? 'badge-yes' : 'badge-no';
  }


  isSidebarCollapsed = false;
  menuItems = [
    { path: '/back-office', title: 'Dashboard', icon: 'dashboard', class: '' },
    { path: '/back-office/demand', title: 'Internship Demands', icon: 'people', class: '' },
    { path: '/back-office/settings', title: 'Settings', icon: 'settings', class: '' }
  ];

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
