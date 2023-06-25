'use client'

import { ITweet } from "@/interfaces/tweet.interface";
import { Session } from "next-auth";

const Feed = ({ tweets, session }: { tweets: Array<ITweet>, session: Session}) => {
  return (
    <section className="text-white font-thin border border-zinc-800 max-w-[800px]">
      <div className="flex p-4">
        <div className="tweet_owner_profile_photo max-w-8 max-h-8 mr-4">
            <img src={session.user.avatar} className="max-w-8 max-h-8 h-[100%] rounded-full" alt="tweet_owner_avatar" />
          </div>

        <div className="w-[100%]">
          <textarea className="color-black bg-[#000000] focus:outline-none max-h-16 w-[100%] resizable-textarea resize-none" placeholder="What's happening?!"/>

          <div className="border w-[100%] border-zinc-800 my-2"></div>

          <div className="user_actions flex">
            <button className="bg-[blue] py-2 px-4 rounded-full flex-right">Tweet</button>
          </div>
        </div>
      </div>
      <div className="tweets_section">
        {
          tweets.map(tweet => {
            return (
              <>
              <div className="border w-[100%] border-zinc-800 my-2"></div>

              <div key={tweet.id} className="tweet_section pr-8 p-4 flex">
                <div className="tweet_owner_profile_photo max-w-8 max-h-8 mr-4">
                  <img src={tweet.user.avatar} className="max-w-8 max-h-8 h-[100%] rounded-full" alt="tweet_owner_avatar" />
                </div>

                <div className="tweet">
                  <div className="owner_content">
                    <p>{`${session.user.first_name} ${session.user.last_name}`}</p>
                  </div>
                  <div className='mb-2'> 
                    <p>{tweet.text_body}</p>
                  </div>

                  {
                    tweet.media?.map(media => {
                      return <img key={media.id} className="max-w-[512px] max-h-[100%] rounded-md" src={`${media.path}`} alt="tweet_media" />
                    })
                  }
                </div>
              </div>
              </>
            ) // if no tweets than display user has not tweets 
          })
        }
        
        <div className="tweet_statistics pt-2">

        </div>
      </div>   
    </section>
  )
}

export default Feed;