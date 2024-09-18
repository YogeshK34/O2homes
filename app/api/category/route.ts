import { NextRequest, NextResponse } from "next/server";
import client from "../../db/index"

// add a Category
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body.name || typeof body.name !== 'string') {
            return NextResponse.json({
                message: "Category name is required and must be a string"
            }, {
                status: 400
            })
        }
        const createCategory = await client.category.create({
            data: {
                name: body.name
            }
        })

        return NextResponse.json({
            message: "Plant Category Created",
            category: createCategory
        }, {
            status: 201
        })

    } catch (e: any) {
        return NextResponse.json({
            message: e.message
        }, {
            status: 500
        })
    }
}

// to get all the categories
export async function GET() {
    try {
        const getCategory = await client.category.findMany();

        return NextResponse.json({
            message: "All Plant Categories are mentioned below",
            getCategory: getCategory
        }, {
            status: 200
        })

    } catch (e: any) {
        return NextResponse.json({
            message: e.message
        }, {
            status: 500
        })
    }
}