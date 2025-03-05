import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { WebSocketService } from '../../services/web-socket.service';
import { Message } from '../../models/message.model';
import { ConversationService } from "../../services/conversation.service";
import { Conversation } from '../../models/conversation.model';
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  messages: Message[] = [];
  conversationId!: number;
  userId!: number;
  conversation!: Conversation; // Propriété pour stocker la conversation
  errorMessage: string = '';
  connectedUser !: User;
  newMessageContent: string = '';
  editingMessageId: number | null = null; // ID du message en cours d'édition
  editedMessageContent: string = '';
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private conversationService: ConversationService,
    private userService: UserService,
    private webSocketService: WebSocketService
  ) { }

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('idUser')!;
    this.conversationId = +this.route.snapshot.paramMap.get('idConversation')!;
    this.loadConnectedUser();
    this.loadConversation(); // Charger la conversation
    this.loadMessages();

    this.webSocketService.getMessageUpdates().subscribe((message: any) => {
      // Vérifier si le message a un ID, ce qui signifie qu'il s'agit d'un message ajouté
      if (message.id) {
        // Vérifier si le message appartient à la conversation actuelle
        if (message.conversation.id === this.conversationId) {
          this.messages.push(message); // Ajouter le message à la liste
        }
      }
      // Vérifier si l'action est une mise à jour
      else if (message.action === 'updated') {
        const updatedMessage = message.message; // Récupérer le message mis à jour
        // Vérifier si le message mis à jour appartient à la conversation actuelle
        if (updatedMessage.conversation.id === this.conversationId) {
          const index = this.messages.findIndex(m => m.id === updatedMessage.id);
          if (index !== -1) {
            this.messages[index] = updatedMessage; // Mettre à jour le message existant
          } else {
            this.messages.push(updatedMessage); // Ajouter le message s'il n'existe pas
          }
        }
      }
      // Vérifier si l'action est une suppression
      else if (message.action === 'deleted') {
        const deletedMessage = message.message; // Récupérer l'ID du message à supprimer
        if (deletedMessage.conversation.id === this.conversationId) {
          // Marquer le message comme supprimé
          const index = this.messages.findIndex(m => m.id === deletedMessage.id);
          if (index !== -1) {
            this.messages[index] = deletedMessage; // Marquer comme supprimé
          } else {
            this.messages.push(deletedMessage); // Ajouter le message s'il n'existe pas
          }
        }
      }

      // Recharger les messages après modification (peut ne pas être nécessaire)
      this.loadMessages(); // Cela peut être redondant si vous gérez déjà les messages en temps réel
    });
  }

  loadConnectedUser() {
    this.userService.getUserById(this.userId).subscribe(user => {
      this.connectedUser = user;
    });
  }

  loadConversation() {
    this.conversationService.getConversationById(this.conversationId).subscribe({
      next: (conversation) => {
        this.conversation = conversation; // Stocker la conversation récupérée
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de la conversation:', err);
        this.errorMessage = 'Erreur lors de la récupération de la conversation.';
      }
    });
  }

  loadMessages() {
    this.conversationService.getMessagesByConversation(this.conversationId).subscribe(data => {
      this.messages = data;
      this.updateMessageStatusToRead();
    }, error => {
      console.error('Erreur lors de la récupération des messages:', error);
      this.errorMessage = 'Erreur lors de la récupération des messages.';
    });
  }

  sendMessage() {
    this.errorMessage = '';

    if (!this.newMessageContent.trim()) {
      this.errorMessage = 'The message cannot be empty.'; // Définir le message d'erreur
      return; // Ne pas envoyer le message
    }

    const newMessage: Message = {
      id: 0,
      content: this.newMessageContent,
      messageType: 'TEXT',
      timestamp: new Date(),
      sender: this.connectedUser,
      receiver: this.conversation.users[0].id == this.userId ? this.conversation.users[1] : this.conversation.users[0],
      status: 'SENT',
      isTyping: false,
      isPinned: false,
      readAt: null,
      attachmentUrl: null,
      conversation: this.conversation // Utiliser l'objet conversation récupéré
    };

    // Envoyer le message via le service MessageService
    this.messageService.sendMessage(newMessage).subscribe({
      next: () => {
        this.loadMessages();
        this.newMessageContent = '';
      },
      error: (err) => {
        console.error('Erreur lors de l\'envoi du message:', err);
      }
    });
  }

  deleteMessage(id: number) {
    this.messageService.deleteMessage(id).subscribe(() => {
      this.loadMessages(); // Recharger les messages après la suppression
    });
  }

  startEditing(message: Message) {
    this.editingMessageId = message.id; // Définir l'ID du message à modifier
    this.editedMessageContent = message.content; // Charger le contenu du message
  }

  submitEdit() {
    this.errorMessage = '';
    if (!this.editedMessageContent.trim()) {
      this.errorMessage = 'The message cannot be empty.'; // Définir le message d'erreur
      return; // Ne pas envoyer le message
    }
    if (this.editingMessageId !== null) {
      this.messageService.updateMessage(this.editingMessageId,this.editedMessageContent).subscribe({
        next: () => {
          this.loadMessages(); // Recharger les messages après la mise à jour
          this.cancelEdit(); // Annuler l'édition
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du message:', err);
        }
      });
    }
  }

  cancelEdit() {
    this.editingMessageId = null; // Réinitialiser l'ID d'édition
    this.editedMessageContent = ''; // Réinitialiser le contenu
  }

  updateMessageStatusToRead() {
    // Call the backend service to update the status of all messages in the conversation to "READ"
    this.messages.forEach(message => {
      // Check if the message is SENT and if the current user is the receiver
      if (message.status === 'SENT' && message.receiver.id === this.userId) {
        this.messageService.updateMessageStatusToRead(message.id).subscribe({
          next: () => {
            // Update the local message status
            message.status = 'READ';
            message.readAt = new Date(); // Set the read timestamp
          },
          error: (err) => {
            console.error('Error updating message status:', err);
          }
        });
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]; // Get the selected file
  }

  uploadMessage() {
    this.errorMessage = ''; // Reset any previous error message

    // Check if a file is selected
    if (this.selectedFile) {
      // Validate the file type
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const validPdfType = 'application/pdf';

      if (!validImageTypes.includes(this.selectedFile.type) && this.selectedFile.type !== validPdfType) {
        this.errorMessage = 'Please upload a valid image file (JPEG, PNG, GIF) or a PDF file.';
        this.selectedFile = null; // Reset the selected file
        return; // Exit the function if the file is not valid
      }

      const newMessage: Message = {
        id: 0,
        content: this.selectedFile.type === validPdfType ? 'PDF file attached' : 'Image file attached',
        messageType: this.selectedFile.type === validPdfType ? 'PDF' : 'IMAGE',
        sender: this.connectedUser ,
        receiver: this.conversation.users[0].id === this.userId ? this.conversation.users[1] : this.conversation.users[0],
        status: 'SENT',
        isTyping: false,
        isPinned: false,
        readAt: null,
        attachmentUrl: null,
      };

      // Send the message with the attachment
      this.messageService.sendMessageWithAttachment(newMessage, this.selectedFile, this.conversationId).subscribe({
        next: (response) => {
          this.messages.push(response); // Add the new message to the messages array
          this.selectedFile = null; // Reset the selected file
        },
        error: (err) => {
          console.error('Error sending message:', err);
          this.errorMessage = 'Failed to send message. Please try again.'; // Set the error message
        }
      });
    } else {
      this.errorMessage = 'Select a file first.'; // Set error if no file is selected
    }
  }
}
