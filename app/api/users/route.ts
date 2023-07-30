import { allUsersQuery } from "@/utils/queries";
import { client } from "@/utils/client";
import { NextResponse, NextRequest } from "next/server";

export async function GET (request:Request) {
    const response = NextResponse
    const query = allUsersQuery()
    const data = await client.fetch(query);

    if(data) {
        return response.json(data)
    } else {
        return response.json([])
    }
}