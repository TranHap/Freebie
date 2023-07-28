import React from 'react'
import Category from '@/components/Category';

const Page = ({params} : {params: {category: string}}) => {
    const category = params.category
    return (
        <>
            <Category category={category}/>
        </>
    )
}

export default Page 