'use client'

import React from 'react'
import Link from 'next/link';
import { categories } from '../utils/constants';
import { usePathname } from 'next/navigation'

const Discover = () => {
  const pathname = usePathname()
  const partToRemove = "/category/";
  const category = pathname.replace(partToRemove, "");
  const activeTopicStyle = 'xl:border-2 hover:bg-slate-300 xl:border-green text-black bg-green px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer';
  const topicStyle = 'xl:border-2 hover:bg-slate-300 xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black';
  return (
    <div className='xl:border-b-2 xl:border-gray-200 pb-6'>
      <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>
        Thông dụng
      </p>
      <div className="flex flex-wrap gap-3">
        {categories.map((item) => (
          //  <Link href={`/?category=${item.name}`} key={item.name}>
            <Link href={`/category/${item.name}`} key={item.name}>
            <div className={category === item.name ? activeTopicStyle : topicStyle}>
              <span className='font-bold text-2xl xl:text-md '>
                {item.icon}
              </span>
              <span className={`font-small text-md hidden xl:block capitalize`}>
                {item.title}
              </span>
            </div>
           </Link>
        ))}
      </div>
    </div>
  )
}

export default Discover