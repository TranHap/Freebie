import React from 'react'
import Board from '@/components/Board';
import { BASE_URL } from '@/utils';
async function getData () {
  const response = await fetch(`${BASE_URL}api/users`,{ next: { revalidate: 0.1 } })
  const data = await response.json()
  return  data
}

const BoardPage = async () => {
  const data = await getData()
  console.log(data)
  return (
    <div>
        <Board users={data}/>
    </div>
  )
}

export default BoardPage