import { api } from "@/lib/http";
import { IProfileInfo } from "@/types/frienships.interface";

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
