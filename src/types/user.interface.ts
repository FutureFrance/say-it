export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  notifications_count: number;
  following?: Array<IUser>;
  followed?: Array<IUser>;
  background?: string;
}

export enum FriendshipActions {
  DESTROY = 'destroy',
  CREATE = 'create'
}