import BookmarksList from "@/components/user/bookmarks/bookmarksList";
import StickyBookmarkTitle from "@/components/user/bookmarks/stickyBookmarkTitle";
import { authOptions } from "@/lib/auth";
import { getBookmarks } from "@/services/user.service";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Bookmarks = async () => {
  const session = await getServerSession(authOptions);
  if(!session) redirect(`/auth/?callbackUrl=/bookmarks`);
  
  const bookmarks = await getBookmarks(session.accessToken);

  return (
    <div className="">
      <StickyBookmarkTitle 
        session={session}
        bookmarksNumber={bookmarks.data.tweets.length}
      />

      <BookmarksList 
        session={session}
        bookmarksResponse={bookmarks.data} 
      />
    </div>
  )
}

export default Bookmarks;