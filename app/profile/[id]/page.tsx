import React from 'react'
import { BASE_URL } from '@/utils';
import Profile from '@/components/Profile';
import { headers } from 'next/headers'


async function getData (id : string) {
  const response = await fetch(`${BASE_URL}api/profile/${id}`,{ next: { revalidate: 2 } })
  const data = await response.json()
  return  data
}

const Page = async ({params} : {params: {id: string}}) => {
  const id = params.id
  const data = await getData(id)
  return (
    <>
      <Profile data={data}/>
    </>
  )
}

export default Page