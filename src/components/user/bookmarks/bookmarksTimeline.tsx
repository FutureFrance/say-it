'use client'

import { ITweet } from "@/interfaces/tweets/tweet.interface";
import { useState } from "react";
import StickyBookmarkTitle from "./stickyBookmarkTitle";
import BookmarksList from "./bookmarksList";
import { Session } from "next-auth";
import { IGetBookmarks } from "@/services/user.service";

type Props = { 
  fetchedBookmarks: IGetBookmarks;
  session: Session;
}

const BookmarksTimeline = ({ fetchedBookmarks, session }: Props) => {
  const [bookmarks, setBookmarks] = useState<Array<ITweet>>(fetchedBookmarks.tweets);
  const [hasMore, setHasMore] = useState<boolean>(fetchedBookmarks.hasMore);
  
  return (
    <>
      <StickyBookmarkTitle 
        session={session}
        bookmarksNumber={bookmarks.length}
        // setBookmarks={setBookmarks}
      /> 

      <BookmarksList 
        session={session}
        bookmarksResponse={fetchedBookmarks}
        // bookmarks={bookmarks} 
        // setBookmarks={setBookmarks}
        // hasMore={hasMore}
        // setHasMore={setHasMore}
      />
    </>
  )
}

export default BookmarksTimeline;