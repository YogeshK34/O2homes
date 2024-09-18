import { NextRequest, NextResponse } from "next/server";
import client from "../../../db/index"

// to add a cart
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const userId = body.userId;

        // Check if the user already has a cart
        let cart = await client.cart.findUnique({
            where: { userId: userId }
        });

        // If no cart exists, create a new cart for the user
        if (!cart) {
            cart = await client.cart.create({
                data: {
                    userId: userId, // Create the cart for the user
                }
            });
        }

        // check if the Plant exists
        const plant = await client.plant.findUnique({
            where: { id: body.plantId }
        })
        if (!plant) {
            return NextResponse.json({
                message: "Plant not found"
            }, {
                status: 404
            })
        }

        // add item to the cart
        const cartItem = await client.cartItem.create({
            data: {
                plantId: body.plantId,
                cartId: body.cartId,
                quantity: body.quantity
            }
        })

        return NextResponse.json({
            message: "Item added to the cart",
            cartItem: cartItem
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