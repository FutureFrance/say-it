const SpinningLoader = () => {
  return (
    <>
    <div className="border w-[100%] border-zinc-800 mb-2"></div>
    <div className="w-[100%] flex justify-center my-8"></div>
    <div className="animate-spin rounded-full h-4 w-4 border-t-[2px] border-b-[px] border-blue-500"></div>
    </>
  )
}

export default SpinningLoader;