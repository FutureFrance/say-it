import { api } from "@/lib/http"
import { FriendshipActions } from "@/types/user.interface";

export const friendshipAction = async (accessToken: string, targetUserId: number, action: FriendshipActions) => {
  return await api
    .post(`/users/friendship/${action}`, { targetUserId }, { headers: { Authorization: `Bearer ${accessToken}`}})
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    });
}