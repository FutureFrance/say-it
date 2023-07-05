import { IUser } from "@/interfaces/user.interface";

export interface ITweet {
  id: number;
  user: IUser;
  text_body: string;
  likes_count: number; 
  replies_count: number;
  media?: Array<IMedia>; 
  replies?: Array<ITweet>; 
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
