import { api } from "@/lib/http"

export const friendshipAction = async (accessToken: string, targetUserId: number, action: string) => {
  return await api
    .post(`/users/friendship/${action}`, { targetUserId }, { headers: { Authorization: `Bearer ${accessToken}`}})
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    });
}