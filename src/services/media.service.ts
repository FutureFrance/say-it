import { api, axiosAuthHeader } from "@/lib/http";

export const uploadMedia = async (files: any) => {
  const headers: any = await axiosAuthHeader();

  headers.headers['Content-Type'] = 'multipart/form-data';

  console.log('headers', headers);

  return await api.post('/media', { 
      files: files, 
      target_type: 'tweet',
      media_type: 'image',
      targetId: 3,
    }, headers)
    .then(res => {
      return res.data
    })
    .catch(e => {
      throw new e;
    })
}