import { FETCH_NOTIFICATIONS_TAKE } from "@/constants/tweets/notification.constants";
import { api } from "@/lib/http";
import { IProfileInfo } from "@/types/frienships.interface";
import { INotificationResponse } from "@/types/notification.interface";
import { IUser } from "@/types/user.interface";

export const getUserProfileInfo = async (accessToken: string, targetUserUsername: string) => {
  return await api
    .get<IProfileInfo>(`/users/${targetUserUsername}`, { headers: { Authorization: `Bearer ${accessToken}`}})
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    });
}

export const getFollowingsRecomandation = async (accessToken: string) => {
  return api
    .get<Array<IUser>>('/users/follows-recomandation', { headers: { Authorization: `Bearer ${accessToken}` }})
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    })
}

export const getUserNotifications = async (accessToken: string, offset = 0, take = FETCH_NOTIFICATIONS_TAKE) => { 
  return await api
    .get<INotificationResponse>(`/notifications/?offset=${offset}&take=${take}`, { headers: { Authorization: `Bearer ${accessToken}`}})
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    });
}

export const updateUserProfile = async (accessToken: string, body: IUpdateUserProfileBody) => {
  return await api
    .put<{ avatar: string, background: string, name: string, bio: string }>(
      '/users', 
      body, { 
        headers: { 
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": 'multipart/form-data' 
        }
      }
    )
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    })
}

export const searchUsers = async (accessToken: string, query: string) => {
  return await api
    .get<SearchUsersResponse>(`/users/search-users?query=${query}`, { headers: { Authorization: `Bearer ${accessToken}` }})
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    })
}

export const getFollowers = async (accessToken: string, targetUsername: string, offset?: number, take?: number) => {
  const url = offset && take
    ? `/users/${targetUsername}/followers?offset=${offset}&take=${take}`
    : `/users/${targetUsername}/followers`

  return await api
    .get<GetFollowersResponse>(url, { headers: { Authorization: `Bearer ${accessToken}` }})
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    })
}

interface IUpdateUserProfileBody {
  name?: string;
  bio?: string;
  newAvatar: File | null;
  newBackground: File | null;
  defaultBackground: boolean;
}

export interface ISearchUsersResponse { 
  id: number, 
  username: string, 
  avatar: string, 
  name: string 
}

export type SearchUsersResponse = Array<Pick<IUser, "avatar" | "id" | "username" | "background" | "name">>;
export type GetFollower = Pick<IUser, "avatar" | "username" | "name" | "bio" | "id"> & { amIfollowing: boolean };
export type GetFollowersResponse = { 
  followers: Array<GetFollower>; 
  hasMore: boolean;
};