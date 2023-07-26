import { ITweet } from "@/interfaces/tweets/tweet.interface";
import { IUser } from "./user.interface";

export interface INotification {
  id: number;
  text: string | null;
  created_at: string;
  type: NotificationTypes;
  action_user: IUser;
  tweet?: ITweet
}

export interface INotificationResponse {
  notifications: Array<INotification>;
  hasMore: boolean;
}

export enum NotificationTypes {
  LIKE = 'like',
  REPLY = 'reply',
  FOLLOW = 'follow'
}