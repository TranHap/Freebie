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
import ReceiveButton from './ReceiveButton';
import { POST } from '@/app/api/auth/route';


interface IProps {
  postDetails : Video
}

interface IReceiver {
  receiverName:string,
  receiverAddress:string,
  receiverPhone:string,
}

const Detail = ({postDetails} : IProps) => {
  // Check the user to handle like button for example
  const { userProfile }: any = useAuthStore();
  // Get the post information so if the user comment  or like, we can modify the post information
  const [post, setPost] = useState(postDetails)
  const [comment, setComment] = useState('')
  const [isPostingComment, setIsPostingComment] = useState(false)
  const[showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [receiver, setReceiver] = useState<IReceiver>()
  // If the user click the x button, return back to the homepage
  
 
  const router = useRouter()
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
      const response = await fetch(`${BASE_URL}/api/hello/${post._id}`, {
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

  const handleReceive = async () => {
    if(userProfile && name && address && phoneNumber) {
      const response = await fetch(`${BASE_URL}/api/receive/${post._id}`, {
        method:"PUT",
        body: JSON.stringify({
          userId: userProfile._id,
          postId: post._id,
          name,
          address,
          phoneNumber,
        })
      })
      const data = await response.json()
      setReceiver(data.receiver)
      setShowForm(false)
    } 
  }  



  const clickReceive = async () => {
    if(receiver) {
      alert("Receive")
    } else {
      setShowForm(true)
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
          {/* Our post image */}
          <div className='lg:h-[100vh] h-[60vh] flex justify-center items-center'>  
            <img
              src={post?.image.asset.url}
              className=' w-full h-3/4 bg-gray-100'
            />
          </div>
      </div>  

      {/* Our right section */}
      <div className='relative flex flex-col w-[1000px] md:w-[900px] lg:w-[700px]'>

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
            {/* Our receive button */}
            <div className='mt-10 px-10 w-full'>
                {/* {userProfile && 
                  <ReceiveButton 
                    clickReceive={() => clickReceive()} 
                    showForm={showForm} 
                    setShowForm={setShowForm}
                    handleReceive = {handleReceive}
                    name={name}
                    setName={setName}
                    address={address}
                    setAddress = {setAddress}
                    phoneNumber = {phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    isReceived = {isReceived}
                  />
                } */}
                   {/* {receiver && <div>{receiver.receiverName}</div>}  */}
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
            <div
            >
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
    </div>
  )
}

export default Detail