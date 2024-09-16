import { NextRequest } from "next/server";
import client from "../../db/index"

export async function POST(req: NextRequest) {
    // extract the body herev
    const body = await req.json();
    const createUser = client.user.create({
        data: {
            username: body.username,
            password: body.password,
            name: body.name
        }
    })

    // store the body in the Database
    console.log(body)

    return Response.json({
        message: "You are logged in"
    })
}


//postgresql://neondb_owner:VK2RnoYft9ZL@ep-lingering-art-a5hvi74p.us-east-2.aws.neon.tech/neondb?sslmode=require

