import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Report {
  id: number;
  submissionDate: string;
  validatedByCompany: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:8089/Document/reports';

  constructor(private http: HttpClient) {}

  // ✅ Upload a Report
  uploadReport(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/add`, formData);
  }

  // ✅ Get All Reports
  getAllReports(): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.apiUrl}/all`);
  }
}
