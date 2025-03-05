import { User } from './user.model';

export interface Conversation {
  id: number;
  users: User[];
  createdAt?: Date;
  lastMessageTimestamp?: Date;
  isFavorite: boolean;
  unreadMessagesCount: number;
  notificationEnabled: boolean;
}
