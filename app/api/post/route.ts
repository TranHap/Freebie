import { client } from "@/utils/client";
import { allPostsQuery } from "@/utils/queries";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const response = NextResponse
  const query = allPostsQuery()
  const data = await client.fetch(query)
  return response.json(data) 

}

export async function POST(request: Request) {
  const response = NextResponse
  const document = await request.json()
  client.create(document)
  .then(() => response.json("Add document Success"))
}