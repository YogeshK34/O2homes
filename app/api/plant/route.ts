import { NextRequest, NextResponse } from "next/server";
import client from "../../db/index"

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

        if (!body.id) {
            return NextResponse.json({
                message: "Plant Id is required to update"
            })
        }

        // Validate required fields
        if (!body.name || !body.description || !body.price || !body.stock || !body.categoryId) {
            return NextResponse.json({
                message: "All fields (name, description, price, stock, categoryId) are required"
            }, {
                status: 400
            });
        }

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
        });

    } catch (e: any) {
        return NextResponse.json({
            message: e.message
        }, {
            status: 500
        });
    }
}

// to delete a Plant
export async function DELETE(req: NextRequest) {
    try {
        const body = await req.json();

        // ensure that ID is provided
        if (!body.id) {
            return NextResponse.json({
                message: "Plant Id is require to delete"
            }, {
                status: 400
            })
        }

        // delete related Image
        await client.image.deleteMany({
            where: {
                plantId: body.id
            }
        })

        const deletePlant = await client.plant.delete({
            where: {
                id: body.id
            }
        })

        return NextResponse.json({
            message: "Plant Deleted successfully",
            deletePlant: deletePlant
        }, {
            status: 200
        })

    } catch (e: any) {
        return NextResponse.json({
            message: e.message
        })
    }
}