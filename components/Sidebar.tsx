'use client'
import React, {useState} from 'react'
import { NextPage } from 'next'
import  { usePathname } from 'next/navigation';
import Link from 'next/link';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import Discover from './Discover';
import Rank from './Rank';
import Footer from './Footer';
import useAuthStore from '@/store/authStore';


const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true)
  const {userProfile } = useAuthStore()
  const pathname = usePathname()
  const activeLink = 'flex items-center gap-3 hover:bg-slate-300 p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded';
  const normalLink = 'flex items-center gap-3 hover:bg-slate-300 p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded';
  return (
    <div>
      <div
        className='block xl:hidden m-2 ml- mt-3 text-xl'
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className='xl:w-600 w-[200px] flex flex-col justify-start mb-10 border-r-2 border-gray-900 xl:border-0 p-3 '>
          <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
            <Link href="/">
              <div className={pathname === '/' ? activeLink : normalLink}>
                <p className="text-2xl"><AiFillHome /></p>
                <p>Home page </p>
              </div>
            </Link>
          </div>
          {!userProfile && (
            <div className='px-2 py-4 hidden xl:block'>
              <p className='text-gray-400'>Please login to view</p>
            </div>
          )}
          <Discover />
          <Link href="/rank">
            <Rank />
          </Link>
          <Footer />
        </div>   
      )}
    </div>
  )
}

export default Sidebar