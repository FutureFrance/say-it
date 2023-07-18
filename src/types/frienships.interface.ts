import { IUser } from "./user.interface";

export interface IProfileInfo {
  user: IUser;
  followingsCount: number;
  followersCount: number;
  amIfollowing?: boolean;
}

export interface IGetFriendShipFollowers {
  followers: Array<IUser>
}

export interface IGetFriendShipFollowing {
  following: Array<IUser>
}
