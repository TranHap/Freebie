import { client } from "@/utils/client";
import { NextResponse} from "next/server";
import { topicPostsQuery } from "@/utils/queries";

export async function GET(request:Request) {
    const response = NextResponse
    const url = request.url
    const partToRemove = "http://localhost:3000/api/discover/";
    const topic = url.replace(partToRemove, "");

    const query = topicPostsQuery(topic)
    const post = await client.fetch(query)
    return response.json(post)
}