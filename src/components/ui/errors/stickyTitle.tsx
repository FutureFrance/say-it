const StickyTitle = ({ title }: { title: string }) => {
  return (
    <div className="h-10 sticky top-0 bg-black bg-opacity-75 backdrop-blur-[1px]">
      <p className="font-semibold text-md pb-2 pl-2 pt-2">{title}</p>
      <div className="border w-[100%] border-zinc-800"></div>
    </div>
  )
}

export default StickyTitle;
