"use client"
import { Post } from '@/types'
import React,{useState} from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';


const PostCard = ({post} : {post: Post} ) => {


    return (
        <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
            {/* UserProfile */}
            <div>
                <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded '>
                    {/* For the image */}
                    <div className='md:w-10 md:h-16 w-10 h-10'>
                        <Link href={`/profile/${post.userId}`}>
                            <>
                                <Image
                                    width={62}
                                    height={62}
                                    className=' rounded-full'
                                    src={post?.postedBy?.image}
                                    alt='user-profile'
                                />
                            </>
                        </Link>
                    </div>
                    {/* For the name and username */}
                    <div>
                        <Link href={`/profile/${post.userId}`}>
                            <div className='flex flex-col items-start gap-2'>
                                <p className='flex font-bold gap-2 items-center text-primary md:text-md  '>
                                    {post?.postedBy?.userName} {` `}
                                    <GoVerified className='text-blue-400 text-md' />
                                </p>
                                <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                                    {post?.postedBy?.userName}
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            {/* Our image and buttons */}
            <div  className='lg:ml-15 flex gap-4 relative'>
                <div              
                    className='rounded-3xl'
                >
                    {/* Our  image */}
                    <Link href={`/detail/${post._id}`}>
                        <img
                            src={post?.image?.asset?.url}
                            alt="Hello"
                            className='hover:opacity-75 lg:w-[600px] h-[200px] md:h-[200px] lg:h-[228px] w-[200px] rounded-2xl cursor-pointer bg-gray-100'
                        />
                    </Link>
                </div>
            </div>
            
        </div>
    )
}

export default PostCard