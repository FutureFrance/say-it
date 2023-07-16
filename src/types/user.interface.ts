export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  background?: string;
}

export enum FriendshipActions {
  DESTROY = 'destroy',
  CREATE = 'create'
}