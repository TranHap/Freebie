import { client } from "@/utils/client";
import { singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery } from "@/utils/queries";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request:Request) {
    const response = NextResponse
    const url = request.url
    const partToRemove = "http://localhost:3000/api/profile/";
    const id = url.replace(partToRemove, "");


    const query = singleUserQuery(id);
    const userVideosQuery = userCreatedPostsQuery(id);
    const userLikedVideosQuery = userLikedPostsQuery(id);

    const user = await client.fetch(query);
    const userVideos = await client.fetch(userVideosQuery);
    const userLikedVideos = await client.fetch(userLikedVideosQuery);

    const data = { user: user[0], userVideos, userLikedVideos}
    return  response.json(data)
}