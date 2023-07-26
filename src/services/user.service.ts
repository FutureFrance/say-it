import { FETCH_NOTIFICATIONS_TAKE } from "@/constants/tweets/notification.constants";
import { api } from "@/lib/http";
import { IProfileInfo } from "@/types/frienships.interface";
import { INotificationResponse } from "@/types/notification.interface";
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

export const getUserNotifications = async (accessToken: string, offset = 0, take = FETCH_NOTIFICATIONS_TAKE) => { // create fetch notifs take should be higher
  return await api
    .get<INotificationResponse>(`/notifications/?offset=${offset}&take=${take}`, { headers: { Authorization: `Bearer ${accessToken}`}})
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    });
}