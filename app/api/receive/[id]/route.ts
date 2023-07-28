import { client } from "@/utils/client";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(request:Request) {
    const response = NextResponse
    const {userId, postId, name, phoneNumber, address, isReceived} = await request.json()
    const receiverPatch = {
        // receivedBy: { _type:"receivedBy", _ref: userId},
          receiverName: name, 
          receiverAddress: address,
          receiverPhone: phoneNumber
      };
    const data  = await client
        .patch(postId)
        .set({ receiver: receiverPatch})
        .commit()
    // const result = 
    //     await client
    //     .patch(postId)
    //     .set({isReceived:isReceived})
    //     .commit()

    return response.json(data)
  }