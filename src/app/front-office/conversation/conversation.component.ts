import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConversationService } from '../../services/conversation.service';
import { UserService } from '../../services/user.service';
import { WebSocketService } from '../../services/web-socket.service';
import { Conversation } from '../../models/conversation.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  conversations: Conversation[] = [];
  userId!: number;
  connectedUser !: User;
  newEmail: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 2;
  errorMessage: string = '';
  private emailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(
    private conversationService: ConversationService,
    private userService: UserService,
    private route: ActivatedRoute,
    private webSocketService: WebSocketService
  ) { }

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('idUser')!;
    this.loadConnectedUser();
    this.loadConversations();

    this.webSocketService.getMessages().subscribe((message: any) => {
      if (message.id) {
        this.conversations.push(message);
      } else if (typeof message === 'string' && message.startsWith('deleted:')) {
        const idToDelete = parseInt(message.split(':')[1], 10);
        this.conversations = this.conversations.filter(c => c.id !== idToDelete);
      }
      this.loadConversations();
    });
  }

  loadConnectedUser() {
    this.userService.getUserById(this.userId).subscribe(user => {
      this.connectedUser = user;
    });
  }

  loadConversations() {
    this.conversationService.getConversations(this.userId).subscribe(data => {
      this.conversations = data;
    });
  }

  deleteConversation(id: number) {
    this.conversationService.deleteConversation(id).subscribe(() => {
    });
  }

  createConversation(email: string) {
    this.errorMessage = '';

    if (!email.trim()) {
      this.errorMessage = 'The email field cannot be empty.';
      return;
    }

    if (!this.emailPattern.test(email)) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    if (this.connectedUser.email === email) {
      this.errorMessage = 'You cannot create a conversation with yourself.';
      return;
    }

    this.conversationService.getConversations(this.userId).subscribe(existingConversations => {
      const userExists = existingConversations.some(conversation =>
        conversation.users.some(user => user.email === email)
      );

      if (userExists) {
        this.errorMessage = 'A conversation with this user already exists.';
        return;
      }

      this.userService.getUserByEmail(email).subscribe(user => {
        const newConversation: Conversation = {
          id: 0,
          users: [user, this.connectedUser ],
          isFavorite: false,
          unreadMessagesCount: 0,
          notificationEnabled: true
        };

        this.conversationService.createConversation(newConversation).subscribe(() => {
          this.newEmail = '';
          this.loadConversations();
        });
      }, error => {
        this.errorMessage = 'No user found with this email address.';
      });
    });
  }

  get paginatedConversations() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.conversations.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.conversations.length) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  shouldShowPagination(): boolean {
    return this.conversations.length > this.itemsPerPage;
  }

  protected readonly Math = Math;
}
