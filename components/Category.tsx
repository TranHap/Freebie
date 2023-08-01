'use client'
import React, {useEffect, useState} from 'react'
import NoResults from '@/components/NoResults';
import PostCard from '@/components/PostCard';
import { categories } from '@/utils/constants'; 
import { Post } from '@/types';
import useAuthStore from '@/store/authStore';
import { useRouter, useSearchParams } from 'next/navigation';


const Category = ({category} : {category: string}) => {
  const {fetchAllSortedPosts, allSortedPosts } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    fetchAllSortedPosts(category);
  }, [fetchAllSortedPosts]);


  return (
  <div className='flex flex-col gap-5'>
     <div className='xl:grid xl:grid-cols-3 xl:gap-4 flex flex-col  h-full'>
      {allSortedPosts.length ? (
        allSortedPosts?.map((post : Post) => (
          <PostCard post={post} key={post._id}/>
        ))
      ) : (
        <div className='flex justify-center items-center'>
          <NoResults text={"Chưa có bài đăng"} /> 
        </div>
      )}
    </div>
  </div>
  )
}

export default Category