import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyToken } from '@/lib/auth';

// GET cart items
export async function GET(request) {
    try {
        const decoded = verifyToken(request);
        if (!decoded) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const [items] = await pool.query(
            'SELECT product_id, quantity FROM cart_items WHERE user_id = ?',
            [decoded.userId]
        );

        // Format as { productId: quantity }
        const cartItems = {};
        items.forEach(item => {
            cartItems[String(item.product_id)] = item.quantity;
        });

        return NextResponse.json({ success: true, cartItems });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

// POST add/update cart item
export async function POST(request) {
    try {
        const decoded = verifyToken(request);
        if (!decoded) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { productId, quantity } = await request.json();

        if (quantity <= 0) {
            // Remove from cart
            await pool.query(
                'DELETE FROM cart_items WHERE user_id = ? AND product_id = ?',
                [decoded.userId, productId]
            );
        } else {
            // Upsert: insert or update
            await pool.query(
                `INSERT INTO cart_items (user_id, product_id, quantity) 
                 VALUES (?, ?, ?) 
                 ON DUPLICATE KEY UPDATE quantity = ?`,
                [decoded.userId, productId, quantity, quantity]
            );
        }

        return NextResponse.json({ success: true, message: 'Cart updated' });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

// DELETE clear entire cart
export async function DELETE(request) {
    try {
        const decoded = verifyToken(request);
        if (!decoded) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        await pool.query('DELETE FROM cart_items WHERE user_id = ?', [decoded.userId]);

        return NextResponse.json({ success: true, message: 'Cart cleared' });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
