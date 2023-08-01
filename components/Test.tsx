'use client'

import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
// import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { GoogleLogin, googleLogout  } from '@react-oauth/google';
import Logo from '../utils/logo.png';
import { GoogleOAuthProvider } from "@react-oauth/google"
import { createOrGetUser } from '@/utils';
import useAuthStore from '@/store/authStore';


const Navbar = () => {
  // After log in using googleLogout, we now have userProfile created in our Sanity, now we access it
  const { userProfile, addUser, removeUser } = useAuthStore()
  const [searchValue, setSearchValue] = useState('')
  const [isToggle, setToggle] = useState(false)
  const router = useRouter()
  const handleSearch = (e : {preventDefault : () => void}) => {
    e.preventDefault()
    if(searchValue) {
      router.push(`/search/${searchValue}`)
    }
  }
  return (
  <>
  <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
      <Link href="/">
        <div className='w-[100px] md:w-[129px]'>
          <Image
              className='cursor-pointer'
              src={Logo}
              alt='logo'
              layout='responsive'
          />
        </div>
      </Link>
      <div className="relative hidden md:block">
        <form 
          onSubmit={handleSearch}
          className="absolute md:static top-10 left-20 bg-white"
        >
          <input 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="bg-white p-3 md:text-md font-medium border-1 
            border-blue-300 focus:outline-none focus:border-2 focus:border-blue w-[300px] md:w-[400px] rounded-full md:top-0"
            placeholder='Search items'
          />
          <button
            onClick={handleSearch}
            className='absolute md:right-5 right-6 top-4 border-l-2 border-blue pl-4 text-2xl text-blue'
          >
            <BiSearch />
          </button>
        </form>
      </div>
      <div>
        {userProfile ? (
          <div className='flex items-center justify-center gap-5 md:gap-10'>
            <Link href='/board'>
              <button className='border-2 p-3 md:px-4 text-md bg-blue hover:bg-purple text-white font-semibold flex items-center gap-2 rounded-full'>
                <span className='hidden md:block'>Board</span>
              </button>
            </Link>
            <Link href='/upload'>
              <button className='border-2 p-3 md:px-4 text-md bg-blue hover:bg-purple text-white  font-semibold flex items-center gap-2 rounded-full'>
                <span className='hidden md:block'>Cho đi</span>
              </button>
            </Link>
            {userProfile.image && (
                <>
                    <button onClick={() => setToggle((prev) => !prev)}>
                        <Image
                            width={48}
                            height={48}
                            className=' rounded-full cursor-pointer'
                            src={userProfile?.image}
                            alt='user-profile'
                        />
                    </button>
                  
                  
                    <div 
                        className={`${isToggle ? "flex flex-col gap-3":"hidden" } 
                        p-6 bg-blue absolute top-20 right-0 mx-4 my-2 min-w-[140px] 
                        z-40 rounded-xl ring-offset-2 ring-2 ring-blue`}
                    >
                            <Link href={`/profile/${userProfile._id}`}>
                                <div
                                    onClick={() => setToggle(false)}
                                    className="transform text-white transition-transform hover:scale-110 hover:font-bold"
                                >
                                    View profile
                                </div>
                            </Link>
                            <button
                                type='button'
                                className=' border-2 p-2 text-white transition-transform hover:scale-110 rounded-full cursor-pointer outline-none shadow-md'
                                onClick={() => {
                                googleLogout();
                                removeUser();
                                setToggle(false);
                                }}
                            >                               
                                Log out
                            </button>
                    </div>
                                  
                </>
            )}
          </div>
        ) : (
          <GoogleLogin 
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log("Stressed girl")}
          />
        )}
      </div>
    </div>
  </GoogleOAuthProvider >
  </>
  )
}

export default Navbar