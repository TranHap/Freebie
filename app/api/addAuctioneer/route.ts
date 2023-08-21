import { client } from "@/utils/client";
import { NextResponse, NextRequest } from "next/server";
import { uuid } from "uuidv4";

export async function PUT(request:Request) {
    const response = NextResponse
    const { userId, postId, price, highestPrice} = await request.json()
    
    const data = await client
        .patch(postId)
        .setIfMissing({ auctioneers: [] })
        .insert('after', 'auctioneers[-1]', [
            {
            postedBy: { _type:"postedBy", _ref: userId},
            price,
            _key: uuid(),
            },
        ])
        .commit()
    await client
        .patch(postId)
        .set({highestPrice : highestPrice})
        .commit()
    return response.json(data)
}