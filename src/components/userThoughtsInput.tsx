import { Session } from "next-auth";

export const UserThoughtsInput = ({ session }: { session: Session }) => {
  return (
    <div className="flex p-4">
        <div className="tweet_owner_profile_photo max-w-8 max-h-8 mr-4">
            <img 
              src={session.user.avatar} 
              className="max-w-8 max-h-8 h-[100%] rounded-full" 
              alt="tweet_owner_avatar" 
            />
          </div>

        <div className="w-[100%]">
          <textarea 
            className="color-black bg-[#000000] focus:outline-none max-h-16 w-[100%] resizable-textarea resize-none" 
            placeholder="What's happening?!"
          />

          <div className="border w-[100%] border-zinc-800 my-2"></div>

          <div className="user_actions flex">
            <button className="bg-[blue] py-2 px-4 rounded-full flex-right">Tweet</button>
          </div>
        </div>
      </div>
  )
}

export default UserThoughtsInput;