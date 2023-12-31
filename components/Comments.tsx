'use client'
import React, { Dispatch, SetStateAction } from 'react'
import NoResults from './NoResults'
import useAuthStore from '@/store/authStore';
import { NextPage } from 'next';
import { IUser } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';

interface IProps {
  comment: string;
  // Welcome to typescript
  addComment : (e: React.FormEvent) => void;
  // Because out comment accept an argument, we have to specify it, I do not understand TT !
  setComment: Dispatch<SetStateAction<string>>;
  isPostingComment: Boolean;
  comments: IComment[]
}
interface IComment {
  comment: string;
  lenght? : number;
  _key: string;
  postedBy: { _ref: string, _id: string}
}

const Comments : NextPage<IProps> =  ({comment, addComment, setComment, isPostingComment, comments}) => {

  const { userProfile, allUsers}  = useAuthStore()
  return (
    <div className='border-t-2 border-gray-200 pt-4 px-10 mt-4 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]'>
      <div className='overflow-scroll lg:h-[250px]'>
        {comments?.length ? (
          // In the case if there is comment
          comments.map((comment, idx) => (
            <>
              {allUsers.map((user : IUser) => (
                 user._id === (comment.postedBy._id || comment.postedBy._ref) && (
                  <div className=' p-2 items-center' key={idx}>
                    <Link href={`/profile/${user._id}`}>
                      <div className='flex items-start gap-3'>
                        <div className='w-12 h-12'>
                            <Image
                              width={48}
                              height={48}
                              className='rounded-full cursor-pointer'
                              src={user.image}
                              alt='user-profile'
                              layout='responsive'
                            />
                        </div>
                        <p className='flex cursor-pointer gap-1 items-center text-[18px] font-bold leading-6 text-primary'>
                          {user.userName}{' '}
                          <GoVerified className='text-blue-400' />
                        </p>
                      </div>
                    </Link>
                    <div>
                        <p className='-mt-5 ml-16 text-[16px] mr-8'>
                          {comment.comment}
                        </p>
                    </div>
                  </div>
                 )
              ))}
            </>
          ))
          // In the case if there is no comment
        ) : (
          <NoResults text="No comment" />
        )}
      </div>
      {userProfile && (
        <div className='absolute bottom-0 left-0  pb-6 px-2 md:px-10 '>
          <form onSubmit={addComment} className='flex  gap-4'>
            <input 
              value = {comment}
              onChange={(e) => setComment(e.target.value)}
              className='bg-primary px-6 py-2 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg'
              placeholder='Add comment..'
            />
            <button 
              className='text-md text-gray-400 '
              onClick = {addComment}
            >
              {isPostingComment ? "Commenting" : "Post"}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Comments