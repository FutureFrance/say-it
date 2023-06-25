import { IUser } from "@/types/user.interface";

export interface ITweet {
  id: number;
  user: IUser;
  text_body: string;
  media?: Array<IMedia>; 
  likes?: any[]; // ILike
  comments?: any[]; // IComment
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
