export interface IUser {
  id: number;
  name: string;
  username: string;
  bio: string;
  email: string;
  avatar: string;
  background: string;
  notifications_count: number;
  following?: Array<IUser>;
  followed?: Array<IUser>;
}

export enum FriendshipActions {
  DESTROY = 'destroy',
  CREATE = 'create'
}