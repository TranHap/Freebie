import './styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import Test from '@/components/Test'
import { GoogleOAuthProvider } from "@react-oauth/google"


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Freebie',
  description: 'Gives away things = spreads love',
}
export default function RootLayout( { children,}: {children: React.ReactNode}) {

  return (
    <html lang="en">
        <body className={inter.className}>
          {/* <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}> */}
          <div className='xl:w-[1200px] h-[100vh] m-auto overflow-hidden '>
              <Test />
              <div className='flex gap-3 md:gap-10 '>
                <div className='h-[98vh] overflow-hidden xl:hover:overflow-auto'>
                  <Sidebar />
                </div>
                <div className='mt-4  h-[88vh] flex flex-col gap-10 overflow-auto videos flex-1'>
                  {children}
                </div>
              </div>  
          </div>        
          {/* </GoogleOAuthProvider> */}
        </body>
    </html>
  )
}
