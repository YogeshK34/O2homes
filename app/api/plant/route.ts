import { NextRequest, NextResponse } from "next/server";
import client from "../../db/index"
import { url } from "inspector";

// add Plant
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const createPlant = await client.plant.create({
            data: {
                name: body.name,
                description: body.description,
                price: body.price,
                stock: body.stock,
                categoryId: body.categoryId,
                images: {
                    create: body.images.map((imageUrl: string) => ({
                        url: imageUrl
                    }))
                }
            }
        })

        return NextResponse.json({
            message: "Plant Created",
            createPlant: createPlant
        })
    } catch (e: any) {
        return NextResponse.json({
            message: e.message
        }, {
            status: 404
        })
    }
}

// to get Plant details
export async function GET() {
    try {

        const getPlantDetails = await client.plant.findMany();
        return NextResponse.json({
            message: "Plant Details",
            getPlantDetails: getPlantDetails
        })

    } catch (e: any) {
        return NextResponse.json({
            message: e.message
        })
    }
}

export async function PUT(req: NextRequest) {
    try {

        const body = await req.json();

        // check the body if Plant Id is provided
        if (!body.id) {
            return NextResponse.json({
                message: "Plant Id is required"
            }, {
                status: 400
            })
        };

        const updatePlant = await client.plant.update({
            where: {
                id: body.id
            },
            data: {
                name: body.name,
                description: body.description,
                price: body.price,
                stock: body.stock,
                categoryId: body.categoryId,
                images: {
                    create: body.images.map((imageUrl: string) => ({
                        url: imageUrl
                    }))
                }
            }
        });

        return NextResponse.json({
            message: "Plant updated successfully",
            plant: updatePlant
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