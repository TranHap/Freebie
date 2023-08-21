import { client } from "@/utils/client";
import { NextResponse, NextRequest } from "next/server";
import { uuid } from "uuidv4";

export async function PUT(request:Request) {
    const response = NextResponse
    const { userId, postId} = await request.json()
    
    const data = await client
        .patch(postId)
        .set({highestAuctioneer: {_ref: userId} })
        .commit()
    return response.json(data)
}