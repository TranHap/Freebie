'use client'
// Necessary stuffs
import { useRouter } from 'next/navigation'
import { BASE_URL } from '@/utils';
import Link from 'next/link';
import Image from 'next/image';
import useAuthStore from '@/store/authStore';
import { Video } from '@/types';
import React, { useEffect, useRef, useState} from 'react';

// Our icons
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';

import { GoVerified } from 'react-icons/go'

// other components
import LikeButton from './LikeButton';
import Comments from './Comments';


interface IProps {
  postDetails : Video
}

const Detail = ({postDetails} : IProps) => {
  // Check the user to handle like button for example
  const { userProfile }: any = useAuthStore();
  // Get the post information so if the user comment  or like, we can modify the post information
  const [post, setPost] = useState(postDetails)
  const [comment, setComment] = useState('')
  const [isPostingComment, setIsPostingComment] = useState(false)
  // If the user click the x button, return back to the homepage
  const router = useRouter()

  // This is for user interaction with the video
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null)

  // For our video section
  const onVideoClick = () => {
    if(isPlaying) {
      videoRef?.current?.pause()
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true)
    }
  }
   useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [post, isVideoMuted]);

  // For our like button section
  const handleLike = async (like:boolean) => {
    if(userProfile) {
      const response = await fetch(`${BASE_URL}/api/like`,{
        method: "PUT",
        body: JSON.stringify({
          userId : userProfile._id,
          postId: post._id,
          like
        })
      })
      const data = await response.json()
      setPost({...post, likes : data.likes})
    }
  }

  // For our comment
  const addComment = async (e : {preventDefault : () => void}) => {
    e.preventDefault()
    if(userProfile && comment) {
      setIsPostingComment(true)
      const response = await fetch(`${BASE_URL}/api/post/${post._id}`, {
        method: "PUT",
        body: JSON.stringify({
          userId: userProfile._id,
          postId: post._id,
          comment
        })
      })
      const data = await response.json()
      setPost({...post, comments: data.comments})
      setComment('')
      setIsPostingComment(false)
    }
  }

  return (
    <div className='flex w-full h-[100vh] absolute left-0 top-0 bg-white  flex-wrap lg:flex-nowrap'>
      {/* Our left section */}
      <div className='relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-[#7A9D54] bg-no-repeat bg-cover bg-center'>

          <div className='opacity-90 absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
            <p className='cursor-pointer ' onClick={() => router.back()}>
              <MdOutlineCancel className='text-white text-[35px] hover:opacity-70' />
            </p>
          </div>

          <div className='relative'>
            {/* Our video */}
              <div className='lg:h-[100vh] h-[60vh]'>
                <video
                  ref={videoRef}
                  loop
                  src={post?.video.asset.url}
                  className=' h-full cursor-pointer'
                  onClick={onVideoClick}
                >
                </video>     
              </div>
              {/* White button in the video */}
              <div className='absolute top-[45%] left-[40%]  cursor-pointer'>
                {!isPlaying && (
                  <button onClick={onVideoClick}>
                    <BsFillPlayFill className='text-white text-6xl lg:text-8xl' />
                  </button>
                )}
              </div>
          </div>
            
          {/* Our volume */}
          <div className='absolute bottom-5 lg:bottom-10 right-5 lg:right-10  cursor-pointer'>
            {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <HiVolumeOff className='text-white text-3xl lg:text-4xl' />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)}>
                  <HiVolumeUp className='text-white text-3xl lg:text-4xl' />
                </button>
              )}
          </div>
      </div>  
      {/* Our right section */}
      <div className='relative w-[1000px] md:w-[900px] lg:w-[700px]'>

        <div className='lg:mt-3 mt-3'>
            {/* Our image profile */}
            <Link href={`/profile/${post.postedBy._id}`}>
              <div className='flex gap-4 mb-4 bg-white w-full pl-10 cursor-pointer'>
                {/* Our profile */}
                  <Image
                    width={60}
                    height={60}
                    alt='user-profile'
                    className='rounded-full'
                    src={post.postedBy.image}
                  />
                {/* Our profile name */}
                  <div>
                    <div className='text-xl font-bold lowercase tracking-wider flex gap-2 items-center justify-center'>
                          {post.postedBy.userName.replace(/\s+/g, '')}{' '}
                          <GoVerified className='text-blue-400 text-xl' />
                    </div>
                    <p className='text-md'> {post.postedBy.userName}</p>
                  </div>
              </div>
            </Link>
            {/* Our caption */}
            <div className='px-10'>
              <p className=' text-md text-gray-600'>{post.caption}</p>
            </div>
            {/* Our likes button component*/}
            <div className='mt-10 px-10 flex justify-start'>
              {userProfile && <LikeButton
                likes={post.likes}
                flex='flex'
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
              />} 
            </div>
            {/* Our comment section */}
            <Comments 
              comment = {comment}
              comments = {post.comments}
              setComment = {setComment}
              addComment = {addComment}
              isPostingComment = {isPostingComment}
            />
        </div>

      </div>
    </div>
  )
}

export default Detail