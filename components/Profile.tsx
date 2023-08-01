'use client'
import React, {useEffect, useState} from 'react'
import { IUser, Post } from '@/types';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import PostCard from './PostCard';
import NoResults from './NoResults';

interface IProps {
    data: {
      user: IUser;
      userPosts: Post[];
      userLikedPosts: Post[];
    };
  }

const Profile = ({data} :  IProps) => {
  const [showUserPosts, setShowUserPosts] = useState<Boolean>(true);
  const [postsList, setPostsList] = useState<Post[]>([]);

  const posts = showUserPosts ? 'border-b-2 border-black' : 'text-gray-400';
  const liked = !showUserPosts ? 'border-b-2 border-black' : 'text-gray-400';

  const {user, userPosts, userLikedPosts} = data

  useEffect(()=> {
    if(showUserPosts) {
        setPostsList(userPosts)
    } else {
        setPostsList(userLikedPosts)
    }
  }, [showUserPosts, userLikedPosts, userPosts])

  return (
    <div className='w-full'>
      <div className='flex gap-6 md:gap-10 mb-4 bg-white w-full'>
        <div className='w-16 h-16 md:w-32 md:h-32'>
          <Image
            width={120}
            height={120}
            layout='responsive'
            className='rounded-full'
            src={user?.image}
            alt='user-profile'
          />
        </div>
        <div>
          <div className='text-md md:text-2xl font-bold tracking-wider flex gap-2 items-center justify-center lowercase'>
            <span>{user?.userName?.replace(/\s+/g, '')} </span>
            <GoVerified className='text-blue-400 md:text-xl text-md' />
          </div>
          <p className='text-sm font-medium'> {user?.userName}</p>
        </div>
      </div>
      <div>
        <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
            <p 
                className={`text-xl font-semibold cursor-pointer mt-2 ${posts}`} 
                onClick={()=> setShowUserPosts(true)}
            >
                Posts
            </p>
            <p 
                className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`} 
                onClick={()=> setShowUserPosts(false)}
            >
                Liked
            </p>
        </div>
        <div className='flex gap-6 flex-wrap md:justify-start'>
            {postsList?.length ? (
                postsList.map((post: Post, idx: number) => (
                    <PostCard post={post} key={idx}/>
                ))
            ): (
                <NoResults text={`No ${showUserPosts ? "" :  "liked"} posts yet`}/>
            )}
        </div>
      </div>
    </div>
  )
}

export default Profile