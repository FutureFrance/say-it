import { IUser } from "./user.interface";

export interface ITweet {
  id: number;
  owner: IUser;
  text_body: string;
  media?: any[]; // IMedia
  likes?: any[]; // ILike
  comments?: any[]; // IComment
  views?: number;
}