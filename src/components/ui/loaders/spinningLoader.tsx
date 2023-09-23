const SpinningLoader = ({ size = '[16px]' }: { size?: string }) => {
  return (
    <div>
      {/* <div className="border w-[100%] border-zinc-800 mb-2"></div>
      <div className="w-[100%] flex justify-center my-8"></div> */}
      <div className={`animate-spin rounded-full h-${size} w-${size} border-t-[2px] border-b-[px] border-blue-500`}></div>
    </div>
  )
}

export default SpinningLoader;