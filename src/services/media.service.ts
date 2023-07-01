// import { api, axiosAuthHeader } from "@/lib/http";

// export const uploadMedia = async (files: FileList, tweetId: number) => {
//   return await api.post('/media', { 
//       files: files, 
//       target_type: 'tweet',
//       media_type: 'image',
//       tweetId: tweetId,
//     }, {
//       headers: {
//         ...(await axiosAuthHeader()),
//         "Content-Type": 'multipart/form-data'
//       } 
//     })
//     .then(res => {
//       return res.data
//     })
//     .catch(e => {
//       throw new e;
//     })
// }