
import { client } from "@/utils/client";
import { postDetailQuery } from "@/utils/queries";
import { NextResponse, NextRequest } from "next/server";
import { uuid } from "uuidv4";
import { BASE_URL } from '@/utils';

export async function GET(request:Request) {
  const response = NextResponse

  // Get the id by removing from the original url
  const url = request.url
  // const partToRemove = "http://localhost:3000/api/hello/";
  const partToRemove = `${BASE_URL}api/hello/`;
  const id = url.replace(partToRemove, "");

  // After get the id, we will create our query
  const query = postDetailQuery(id)

  // Now, we will fetch the data
  const data = await client.fetch(query)
  return response.json(data[0])
}

export async function PUT(request:Request) {
  const response = NextResponse
  const {userId, comment, postId } = await request.json()
  const data = 
      await client
      .patch(postId)
      .setIfMissing({ comments: [] })
      .insert('after', 'comments[-1]', [
          {
            comment,
            _key: uuid(),
            postedBy: { _type:"postedBy", _ref: userId}
          },
      ])
      .commit()
  
      return response.json(data)
}