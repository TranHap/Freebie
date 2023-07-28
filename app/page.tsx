
import NoResults from '@/components/NoResults';
import PostCard from '@/components/PostCard';
import { Video } from '@/types';
import { BASE_URL } from '@/utils';
import React from 'react';
import { categories } from '@/utils/constants'; 
import Main from '@/components/Main';
import useAuthStore from '@/store/authStore';
import { useSearchParams  } from 'next/navigation';


// async function getData (category : any) {
//       const response1 = await fetch(`${BASE_URL}/api/hello/${category}`)
//       const posts  = await response1.json()
//       return posts
// }

const Home = async () => {
  
  // console.log(posts)
  return (
    <>
    <Main/>
    </>
  )
}


export default Home