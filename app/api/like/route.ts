import { client } from "@/utils/client";
import { NextResponse, NextRequest } from "next/server";
// Unique indentifier to every single like
import { uuid } from 'uuidv4';

export async function PUT(request:Request) {
    const response = NextResponse
    //  = request.body
    const { userId, postId, like} = await request.json()
    console.log("It will be alright")
    const data = 
    //   This only happens when someone likes the post
        like ? await client
        .patch(postId)
        .setIfMissing({ likes: [] })
        .insert('after', 'likes[-1]', [
            {
            _key: uuid(),
            // we want to know who likes the post
            _ref: userId,
            },
        ])
        .commit()
    // Else if they do not
        : await client
        .patch(postId)
        // We check all the likes and find the like that has the user Id and then we want to remove it
        .unset([`likes[_ref=="${userId}"]`])
        .commit();
    return response.json(data)
}