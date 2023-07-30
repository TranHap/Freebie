
import jwt_decode from 'jwt-decode'

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


// If there isn't that user, we will create one, else we will get that user
export const createOrGetUser = async (response:any, addUser: any) => {

    const decoded : {name:string, picture: string, sub: string} = jwt_decode(response.credential)

    // Extract the response given back to us
    const {name, picture, sub} = decoded

    // Pass this into sanity to create or get the user
    const user = {
        _type: 'user',
        _id: sub,
        userName: name,
        image: picture
    }
    addUser(user)

    await fetch(`${BASE_URL}/api/auth`, {
        method: "POST",
        body: JSON.stringify(user)
    })
}