import { IUser } from "@/interfaces/user.interface";

export interface ITweet {
  id: number;
  user: IUser;
  text_body: string;
  likes_count: number; 
  replies_count: number;
  timestamp_diff?: string;
  media?: Array<IMedia>; 
  replies?: Array<ITweet>; 
  views?: number;
  created_at: string;
  liked: boolean;
  likeId?: number;
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
