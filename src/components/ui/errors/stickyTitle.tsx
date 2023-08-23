const StickyTitle = ({ title }: { title: string }) => {
  return (
    <div className="h-10 z-10 sticky top-0 bg-black bg-opacity-75 backdrop-blur-[1px]">
      <div className="flex items-center mt-2">
        <p className="font-semibold text-lg pl-2">{title}</p>
      </div>
      <div className="border w-[100%] border-zinc-800 mt-2"></div>
    </div>
  )
}

export default StickyTitle;
