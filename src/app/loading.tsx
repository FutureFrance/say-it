export default function Loading() {
  return (
    <div className="overlay select-none fixed top-0 left-0 h-[100%] w-[100%] flex items-center justify-center text-white bg-[black]">
      <div className="animate-spin rounded-full h-8 w-8 border-t-[4px] border-b-[4px] border-blue-500"></div>
    </div>
  )
}