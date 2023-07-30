import React from 'react'
import { BASE_URL } from '@/utils';
import Search from '@/components/Search';

async function getData (searchTerm : string) {
    const response = await fetch(`${BASE_URL}/api/search/${searchTerm}`)
    const posts = await response.json()
    return  posts
  }
  


const Page = async ({params} : {params: {searchTerm: string}}) => {
    const searchTerm = params.searchTerm
    const posts = await getData(searchTerm)
    return (
        <>
            <Search posts = {posts} />
        </>
    ) 
}

export default Page