import NoResults from '@/components/NoResults';
import PostCard from '@/components/PostCard';
import { Video } from '@/types';
import { BASE_URL } from '@/utils';
import React from 'react';
import {  useSearchParams } from 'next/navigation';

async function getData () {
  // const searchParams = useSearchParams()
  // const topic = searchParams?.get('topic')

  // if(topic) {
    // const response = await fetch(`${BASE_URL}/api/discover/${topic}`)
    // const posts = await response.json()
    // return posts
  // } else {
    const response = await fetch(`${BASE_URL}/api/post`)
    const posts  = await response.json()
    return posts
  // }

}

const Home = async() => {

  const posts = await getData()
  return (
    <div className='flex flex-col gap-10 videos h-full'>
      {posts.length ? (
        posts?.map((post : Video) => (
          <PostCard post={post} key={post._id}/>
        ))
      ) : (
        <NoResults text={"No videos"}/>
      )}
    </div>

  )
}


export default Home