import { Component, OnInit } from '@angular/core';
import { ReportService, Report } from '../../services/report.service';

@Component({
  selector: 'app-view-reports',
  templateUrl: './view-reports.component.html',
  styleUrls: ['./view-reports.component.css']
})
export class ViewReportsComponent implements OnInit {
  reports: Report[] = [];
  currentPage: number = 1; // Track current page
  itemsPerPage: number = 3; // Show only 3 rows per page

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.reportService.getAllReports().subscribe(
      data => {
        this.reports = data;
        console.log(this.reports); // ✅ Debugging: Check if all 4 reports are loaded
      },
      error => console.error('Error fetching reports', error)
    );
  }
  pageChanged(event: any) {
    this.currentPage = event.page;
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
