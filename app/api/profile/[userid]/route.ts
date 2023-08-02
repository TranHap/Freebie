import { client } from "@/utils/client";
import { singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery } from "@/utils/queries";
import { NextResponse, NextRequest } from "next/server";
import { BASE_URL } from '@/utils';

export async function GET(request:Request) {
    const response = NextResponse
    const url = request.url
    // const partToRemove = "http://localhost:3000/api/profile/";
    const partToRemove = `${BASE_URL}api/profile/`;
    const id = url.replace(partToRemove, "");

    const query = singleUserQuery(id);
    const userPostsQuery = userCreatedPostsQuery(id);
    const LikedPostsQuery = userLikedPostsQuery(id);

    const user = await client.fetch(query);
    const userPosts = await client.fetch(userPostsQuery);
    const userLikedPosts = await client.fetch(LikedPostsQuery);
    const data = { user: user[0], userPosts, userLikedPosts}
    return  response.json(data)
}