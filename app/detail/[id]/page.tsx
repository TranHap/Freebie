
import React from 'react';
import { BASE_URL } from '@/utils';
import { Video } from '@/types';

import Detail from '@/components/Detail';


async function getData (id : string) {
  const response = await fetch(`${BASE_URL}/api/post/${id}`)
  const postDetails = await response.json()
  return postDetails
}


const Page = async ({params} : {params: {id: string}}) => {
  
  const id = params.id
  let postDetails : Video
  postDetails = await getData(id)

  return (
    <>
      <Detail postDetails={postDetails}/>
    </>
  )
}

export default Page