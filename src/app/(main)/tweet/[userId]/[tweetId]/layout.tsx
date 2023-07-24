export default function TweetLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="text-white font-thin border border-zinc-800 w-[46%]">
      { children }
    </div>
  )
}
