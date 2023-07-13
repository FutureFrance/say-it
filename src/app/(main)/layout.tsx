export default function UserPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-[#000000] min-h-[100vh] flex justify-center min-w-screen"> 
      {children}
    </div>
  )
}