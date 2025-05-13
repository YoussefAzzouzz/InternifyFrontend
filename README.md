###Esprit_school_of_engineering
###📱 Contract & Report Management System – Frontend (Angular)
This is the Angular-based frontend application for the Contract & Report Management System. It interacts with the Spring Boot backend to manage contracts, reports, watermarked PDFs, digital signatures, notifications, and data visualizations.

###🚀 Features
###📄 Contract Management
View contract list with dynamic search by Contract ID and status

Upload PDF files and view/download watermarked contracts

Change contract statuses (e.g., PENDING, APPROVED)

View statistical summaries of contracts by status

Trigger real-time SMS notifications on contract status changes via backend integration

###📑 Report Management
View report list with dynamic search by Report ID and validation status

Upload and sign reports using a Signature Pad

Download reports with embedded digital signatures in the bottom-right corner

View report validation statistics (number of reports validated by the company)

Receive email notifications when a report is signed via backend integration

View AI-generated report summaries based on text analysis

###🛠️ Tech Stack
Frontend Framework: Angular 17+

UI Libraries: Angular Material

HTTP Client: Angular HttpClient for API communication

Charting: ng2-charts (for displaying contract/report status statistics)

Signature Pad: angular2-signaturepad for digital report signing

