import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service'; // Adjust the path as necessary
import { UserService } from '../../services/user.service'; // Import UserService

@Component({
  selector: 'app-message-stats',
  templateUrl: './message-stats.component.html',
  styleUrls: ['./message-stats.component.css']
})
export class MessageStatsComponent implements OnInit {
  userEmail: string = '';
  totalStats: any = { TOTAL: 0, IMAGE: 0, PDF: 0, TEXT: 0, AUDIO: 0 };
  errorMessage: string = '';
  private emailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(private messageService: MessageService, private userService: UserService) { }

  ngOnInit(): void {
    this.messageService.getAllMessageStats().subscribe(stats => {
      this.totalStats = {
        TOTAL: stats.TOTAL || 0,
        IMAGE: stats.IMAGE || 0,
        PDF: stats.PDF || 0,
        TEXT: stats.TEXT || 0,
        AUDIO: stats.AUDIO || 0
      };
    }, error => {
      console.error('Error fetching total message stats:', error);
    });
  }

  fetchMessageStats(userId: number) {
    // Fetch total message stats
    this.messageService.getMessageStats(userId).subscribe(stats => {
      this.totalStats = stats;
    }, error => {
      console.error('Error fetching total message stats:', error);
    });
  }

  searchUserAllMessages() {
    if (!this.userEmail) {
      this.errorMessage = 'Please enter an email address.'; // Set error message
      return; // Exit the function if the input is empty
    }
    if (!this.emailPattern.test(this.userEmail)) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }
    this.errorMessage = '';

    // First, get the user by email
    this.userService.getUserByEmail(this.userEmail).subscribe(user => {
        this.fetchMessageStats(user.id);
    }, error => {
      this.errorMessage = 'User  not found.';
    });
  }

  fetchSentMessageStats(userId: number) {
    // Fetch total message stats
    this.messageService.getSentMessageStats(userId).subscribe(stats => {
      this.totalStats = stats;
    }, error => {
      console.error('Error fetching total message stats:', error);
    });
  }

  searchUserSentMessages() {
    if (!this.userEmail) {
      this.errorMessage = 'Please enter an email address.'; // Set error message
      return; // Exit the function if the input is empty
    }
    if (!this.emailPattern.test(this.userEmail)) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }
    this.errorMessage = '';

    // First, get the user by email
    this.userService.getUserByEmail(this.userEmail).subscribe(user => {
        // If user is found, fetch message statistics using user ID
        this.fetchSentMessageStats(user.id);
    }, error => {
      this.errorMessage = 'User  not found.';
    });
  }

  fetchReceivedMessageStats(userId: number) {
    // Fetch total message stats
    this.messageService.getReceivedMessageStats(userId).subscribe(stats => {
      this.totalStats = stats;
    }, error => {
      console.error('Error fetching total message stats:', error);
    });
  }

  searchUserReceivedMessages() {
    if (!this.userEmail) {
      this.errorMessage = 'Please enter an email address.'; // Set error message
      return; // Exit the function if the input is empty
    }
    if (!this.emailPattern.test(this.userEmail)) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }
    this.errorMessage = '';

    // First, get the user by email
    this.userService.getUserByEmail(this.userEmail).subscribe(user => {
        this.fetchReceivedMessageStats(user.id);
    }, error => {
      console.error('Error fetching user:', error);
      this.errorMessage = 'User  not found.';
    });
  }
}
