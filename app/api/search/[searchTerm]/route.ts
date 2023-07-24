import { client } from "@/utils/client";
import { searchPostsQuery } from "@/utils/queries";
import { NextResponse } from "next/server";

export async function GET(request:Request) {
    const response = NextResponse 
    const url = request.url
    const partToRemove = "http://localhost:3000/api/search/";
    const searchTerm = url.replace(partToRemove, "");
    const query = searchPostsQuery(searchTerm)
    const posts = await client.fetch(query)
    return response.json(posts)

}