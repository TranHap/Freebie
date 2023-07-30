import { client } from "@/utils/client";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request:Request) {
  const response = NextResponse
//   const user = request.body
 
    // console.log(user)
    const user = await request.json()
    client.createIfNotExists(user)
    .then(() => response.json("Login Success"))

    return new Response("Success post")

}