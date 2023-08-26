
import React from 'react';
import { BASE_URL } from '@/utils';
import { Post } from '@/types';

import Detail from '@/components/Detail';


async function getStaticProps (id : string) {
  const response = await fetch(`${BASE_URL}/api/hello/${id}`,{ next: { revalidate: 10 } })
  const postDetails = await response.json()
  console.log(postDetails.highestPrice)
  console.log(postDetails.highestAuctioneer)
  console.log(postDetails._createdAt)
  return postDetails
}


const Page = async ({params} : {params: {id: string}}) => {
  
  const id = params.id
  let postDetails : Post
  postDetails = await getStaticProps(id)

  return (
    <>
      <Detail postDetails={postDetails}/>
    </>
  )
}

export default Page