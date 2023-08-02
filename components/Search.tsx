'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import  { usePathname } from 'next/navigation';
import { GoVerified } from 'react-icons/go';
import Link from 'next/link';
import { IUser, Post } from '@/types';
import useAuthStore from '@/store/authStore';
import NoResults from './NoResults';
import PostCard from './PostCard';
import { useRouter } from 'next/router';

const Search = ({posts} : {posts: Post[]})  => {
    const [isAccounts, setIsAccounts] = useState(false);
    const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
    const isPosts = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
    // For searching users accounts
    const { allUsers } = useAuthStore() 
    const pathName = usePathname()
    const partToRemove = "/search/";
    const searchTerm : any = pathName?.replace(partToRemove, "");

    // List through all the accounts to find those who included the searchterm
    const searchAccounts = allUsers.filter((user : IUser) => user.userName.toLowerCase().includes(searchTerm))


    return (
        <div className='w-full flex flex-col'>
            <div className='flex gap-10 mb-10 border-b-2 border-gray-200 md:fixed z-50 bg-white w-full'>
                <p 
                    onClick={() => setIsAccounts(true)} 
                    className={`text-xl  font-semibold cursor-pointer ${accounts} mt-2`}
                >
                    Accounts
                </p>
                <p  
                    onClick={() => setIsAccounts(false)}
                    className={`text-xl font-semibold cursor-pointer ${isPosts} mt-2`} 
                >
                    Posts
                </p>
            </div>
            {isAccounts ? (
                <div className="md: mt-16">
                    {searchAccounts.length ? (
                        searchAccounts.map((user: IUser, idx:number) => (
                            <Link key={idx} href={`/profile/${user._id}`}>
                                <div className=' flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200'>
                                <div>
                                    <Image width={50} height={50} className='rounded-full' alt='user-profile' src={user.image}/>
                                </div>
                                <div>
                                    <div>
                                    <p className='flex gap-1 items-center text-lg font-bold text-primary'>
                                        {user.userName} <GoVerified className='text-blue-400' />
                                    </p>
                                    <p className='capitalize text-gray-400 text-sm'>
                                        {user.userName}
                                    </p>
                                    </div>
                                </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <NoResults text={`No results for your ${searchTerm}`} />
                    )}
                </div>
            ) : (
                <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start '>
                      {posts.length ? (
                        posts.map((post: Post, idx) => (
                            <PostCard post={post} key={idx} />
                        ))
                      ) : (
                        <NoResults text={`No results for your ${searchTerm}`}/>
                      )}

                </div>
            )}
        </div>
    )
}

export default Search 