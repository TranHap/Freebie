'use client'
import React, {useEffect, useState} from 'react'
import NoResults from '@/components/NoResults';
import PostCard from '@/components/PostCard';
import { categories } from '@/utils/constants'; 
import { Post } from '@/types';
// import { useSearchParams } from 'next/navigation'
import useAuthStore from '@/store/authStore';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface IProps {
  fetchAllPosts: () => void;
  allPosts: Post[];
}

const Main = () => {
 const { fetchAllPosts, allPosts } = useAuthStore();
 const router = useRouter()

  useEffect(() => {
    fetchAllPosts();
  }, [fetchAllPosts]
  );
  const onSelected = (e : any ) => {
    const selectedCategory = e.target.value
    router.push(`/category/${selectedCategory}`)
  }
  

  return (
    <div className='flex flex-col gap-5'>
     <div className='xl:grid xl:grid-cols-3 xl:gap-4 flex flex-col h-full'>
      {allPosts.length ? (
        allPosts?.map((post : Post) => (
          <PostCard post={post} key={post._id}/>
        ))
      ) : (
          <NoResults text={"Chưa có bài đăng"} /> 
      )}
    </div>
  </div>
  )
}

export default Main