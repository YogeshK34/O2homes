import { NextRequest, NextResponse } from "next/server";
import client from "../../db/index"
import bcrypt from "bcrypt"
import { use } from "react";


// to add a User 
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // hash the password
        const hashedPassword = await bcrypt.hash(body.password, 10)

        const createUser = await client.user.create({
            data: {
                username: body.username,
                password: hashedPassword,
                name: body.name
            }
        })
        return NextResponse.json({
            message: "User created",
            createUser: createUser
        })
    } catch (e: any) {
        return NextResponse.json({
            message: e.message
        }, {
            status: 400
        })
    }
}


// to get User details
export async function GET(req: NextRequest) {
    try {
        // Use the URL constructor to parse query parameters
        const { searchParams } = new URL(req.url);

        // Extract 'username' from the query parameters
        const username = searchParams.get("username");

        if (!username) {
            return NextResponse.json({
                message: "Username is required"
            }, { status: 400 });
        }

        // Find the User by username
        const getUserDetails = await client.user.findUnique({
            where: { username }
        });

        if (!getUserDetails) {
            return NextResponse.json({
                message: "User not found"
            }, { status: 404 });
        }

        return NextResponse.json({
            message: "User details fetched",
            user: getUserDetails
        });

    } catch (e: any) {
        return NextResponse.json({
            message: e.message
        }, { status: 500 });  // Return 500 for server-side errors
    }
}
