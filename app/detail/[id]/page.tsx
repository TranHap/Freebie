
import React from 'react';
import { BASE_URL } from '@/utils';
import { Post } from '@/types';

import Detail from '@/components/Detail';


async function getData (id : string) {
  const response = await fetch(`${BASE_URL}/api/hello/${id}`,{ next: { revalidate: 0.1 } })
  const postDetails = await response.json()
  return postDetails
}


const Page = async ({params} : {params: {id: string}}) => {
  
  const id = params.id
  let postDetails : Post
  postDetails = await getData(id)

  return (
    <>
      <Detail postDetails={postDetails}/>
    </>
  )
}

export default Page