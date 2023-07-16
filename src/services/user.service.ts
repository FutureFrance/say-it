import { api } from "@/lib/http"
import { IUser } from "@/types/user.interface";

export const getUserProfileInfo = async (accessToken: string, targetUserId: number) => {
  return await api
    .get<IProfileInfo>(`/users/${targetUserId}`, { headers: { Authorization: `Bearer ${accessToken}`}})
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    });
}

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
