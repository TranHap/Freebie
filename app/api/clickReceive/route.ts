import { client } from "@/utils/client";
import { singleUserQuery} from "@/utils/queries";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(request:Request) {
    const response = NextResponse
    const {id} = await request.json()
    const query = singleUserQuery(id);
    const user = await client.fetch(query);
    const newScore = user[0].score + 1
    const updateUser = await client
    .patch(user[0]._id)
    .set({score: newScore})
    .commit()
    return  response.json(user[0])
}