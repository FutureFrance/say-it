const StickyTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center border-b-2 border-zinc-900 h-10 z-10 sticky top-0 bg-black bg-opacity-75 backdrop-blur-[1px]">
      <p className="font-semibold text-lg pl-4">{title}</p>
    </div>
  )
}

export default StickyTitle;
