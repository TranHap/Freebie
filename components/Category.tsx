'use client'
import React, {useEffect, useState} from 'react'
import NoResults from '@/components/NoResults';
import PostCard from '@/components/PostCard';
import { categories } from '@/utils/constants'; 
import { Video } from '@/types';
// import { useSearchParams } from 'next/navigation'
import useAuthStore from '@/store/authStore';
import { useRouter, useSearchParams } from 'next/navigation';


const Category = ({category} : {category: string}) => {
  const {fetchAllSortedPosts, allSortedPosts } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    fetchAllSortedPosts(category);
  }, [fetchAllSortedPosts]);

  const onSelected = (e : any ) => {
    const selectedCategory = e.target.value
    // setCategory(selectedCategory);
    router.push(`/category/${selectedCategory}`)
  }

  return (
  <div className='flex flex-col gap-5'>
    <div className='flex justify-between items-center border-b-2 border-gray-200 p-2'>
      <div className='text-2xl font-bold'>
        Chọn đồ của bạn
      </div>
      <div>
      <select
          onChange={(e)=> onSelected(e)}
          className='outline-none lg:w-650 border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer'
      >
          <option disabled selected value=''>
            Find
          </option>
          {categories.map((item) => (
              <option
                  key={item.name}
                  className=' outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300'
                  value={item.name}
              >
                  {item.title}
              </option>
          ))}
      </select>
      </div>
    </div>
     <div className='xl:grid xl:grid-cols-3 xl:gap-4 flex flex-col videos h-full'>
      {allSortedPosts.length ? (
        allSortedPosts?.map((post : Video) => (
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