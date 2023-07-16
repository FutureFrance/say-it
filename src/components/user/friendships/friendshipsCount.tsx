export const FriendshipsCount = ({ followingsCount, followersCount }: { followingsCount: number,  followersCount: number }) => {
  return (
    <div className="flex gap-4">
      <p className="text-sm text-neutral-300 cursor-pointer hover:underline">
        <span className="font-semibold text-sm text-white">{followingsCount} </span> 
        Following
      </p>
      <p className="text-sm text-neutral-300 cursor-pointer hover:underline">
        <span className="font-semibold text-sm text-white">{followersCount} </span>
        Followers
      </p>
    </div>
  )
}

export default FriendshipsCount;