'use client'
import React, {useState, useEffect} from 'react'
import { NextPage } from 'next';
import { MdFavorite } from 'react-icons/md';
import useAuthStore from '../store/authStore';


interface IProps {
    likes: any[];
    flex: string;
    handleLike: () => void;
    handleDislike: () => void;
  }
  
const LikeButton : NextPage<IProps> = ({ likes, flex, handleLike, handleDislike }) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const {userProfile } : any = useAuthStore() 
  let filterLikes = likes?.filter((item: any) => item._ref === userProfile?._id);
  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [filterLikes, likes]);

  return (
    <div className='gap-6'>
      <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
        {/* Check if the user has like the post or not, the function is passed down from the parent page which is Detail page */}
        {alreadyLiked ? (
          <div className='bg-slate-200 text-[#F51997] p-2 md:p-4 rounded-full' onClick={handleDislike}>
            <MdFavorite className='text-lg md:text-2lg'/>
          </div>
        ): (
          <div className='bg-slate-400 p-2 md:p-4 rounded-full' onClick={handleLike}>
            <MdFavorite className='text-lg md:text-2lg'/>
          </div>
        )}
        <p className='text-md font-semibold '>{likes?.length || 0}</p>
      </div>
    </div>
  )
}

export default LikeButton