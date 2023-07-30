"use client"
import { Video } from '@/types'
import { NextPage } from 'next';
import React,{useState, useEffect, useRef} from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill, BsPlay } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';


const PostCard = ({post} : {post: Video} ) => {
    const [isHover, setIsHover] = useState(false);
    // const [playing, setPlaying] = useState(false);
    // const [isVideoMuted, setIsVideoMuted] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null)

    // const onVideoPress = () => {
    //     if(playing){
    //         videoRef?.current?.pause()
    //         setPlaying(false)
    //     } else {
    //         videoRef?.current?.play()
    //         setPlaying(true)
    //     }
    // }
    // useEffect(() => {
    //     if (videoRef?.current) {
    //       videoRef.current.muted = isVideoMuted;
    //     }
    //   }, [isVideoMuted]);
    // console.log(post)

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
            {/* Our video, image and buttons */}
            <div  className='lg:ml-15 flex gap-4 relative'>
                <div 
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                  
                    className='rounded-3xl'
                >
                    {/* Our video or image */}
                    <Link href={`/detail/${post._id}`}>
                        {/* <video 
                            loop
                            ref={videoRef}
                            className='lg:w-[600px] h-[200px] md:h-[200px] lg:h-[228px] w-[200px] rounded-2xl cursor-pointer bg-gray-100'
                            src={post?.video?.asset.url}
                        >

                        </video> */}
                        <img
                            src={post?.image?.asset?.url}
                            alt="Hello"
                            className='hover:opacity-75 lg:w-[600px] h-[200px] md:h-[200px] lg:h-[228px] w-[200px] rounded-2xl cursor-pointer bg-gray-100'
                        />
                    </Link>
                    {/* Our button */}
                    {/* {isHover && (
                        <div className='absolute bottom-6 flex gap-10 cursor-pointer left-8 md:left-14 lg:left-0 lg:justify-between md:justify-between w-[50px]  md:w-[50px] lg:w-[100px] p-3'>
                            {playing? (
                                <button onClick={onVideoPress}>
                                    <BsFillPauseFill className='text-black text-2xl' />
                                </button>
                            ) : (
                                <button onClick={onVideoPress}>
                                    <BsFillPlayFill className='text-black text-2xl ' />
                                </button>
                            )}
                            {isVideoMuted ? (
                                <button onClick={() => setIsVideoMuted(false)}>
                                    <HiVolumeOff className='text-black text-2xl' />
                                </button>
                            ) : (
                                <button onClick={() => setIsVideoMuted(true)}>
                                    <HiVolumeUp className='text-black text-2xl' />
                                </button>
                            )}
                        </div>
                    )} */}
                </div>
            </div>
            
        </div>
    )
}

export default PostCard