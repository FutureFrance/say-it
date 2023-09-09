import { Providers } from '@/redux/providers/providers'
import './globals.css'
import PersistanceFlushHandler from '@/components/utils/reduxPurger'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <body className='bg-[black]'>
        <Providers >
          {children}
          <PersistanceFlushHandler />
        </Providers>
      </body> 
    </html>
  )
}

