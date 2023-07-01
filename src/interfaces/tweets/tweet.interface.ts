import { IUser } from "@/interfaces/user.interface";

export interface ITweet {
  id: number;
  user: IUser;
  text_body: string;
  media?: Array<IMedia>; 
  likes_count?: number; 
  comments?: any[]; // IComment
  comments_count: number;
  views?: number;
}

export interface IMedia {
  id: number;
  path: string;
  media_type: MediaTypes;
}

export enum MediaTypes {
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio'
}
