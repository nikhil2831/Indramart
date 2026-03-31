import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyToken } from '@/lib/auth';

// GET user orders
export async function GET(request) {
    try {
        const decoded = verifyToken(request);
        if (!decoded) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        // Get orders
        const [orders] = await pool.query(
            `SELECT o.*, a.full_name, a.phone_number, a.pincode, a.area, a.city, a.state
             FROM orders o
             JOIN addresses a ON o.address_id = a.id
             WHERE o.user_id = ?
             ORDER BY o.created_at DESC`,
            [decoded.userId]
        );

        // Get order items with product details for each order
        const formattedOrders = [];
        for (const order of orders) {
            const [items] = await pool.query(
                `SELECT oi.quantity, p.id as product_id, p.name, p.description, p.price, p.offer_price, p.category,
                        GROUP_CONCAT(pi.image_url ORDER BY pi.sort_order) as images
                 FROM order_items oi
                 JOIN products p ON oi.product_id = p.id
                 LEFT JOIN product_images pi ON p.id = pi.product_id
                 WHERE oi.order_id = ?
                 GROUP BY oi.id, p.id`,
                [order.id]
            );

            formattedOrders.push({
                _id: String(order.id),
                userId: String(order.user_id),
                items: items.map(item => ({
                    product: {
                        _id: String(item.product_id),
                        name: item.name,
                        description: item.description,
                        price: parseFloat(item.price),
                        offerPrice: parseFloat(item.offer_price),
                        image: item.images ? item.images.split(',') : [],
                        category: item.category,
                    },
                    quantity: item.quantity,
                })),
                amount: parseFloat(order.amount),
                address: {
                    _id: String(order.address_id),
                    fullName: order.full_name,
                    phoneNumber: order.phone_number,
                    pincode: order.pincode,
                    area: order.area,
                    city: order.city,
                    state: order.state,
                },
                status: order.status,
                date: new Date(order.created_at).getTime(),
            });
        }

        return NextResponse.json({ success: true, orders: formattedOrders });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

// POST create order from cart
export async function POST(request) {
    try {
        const decoded = verifyToken(request);
        if (!decoded) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { addressId } = await request.json();

        if (!addressId) {
            return NextResponse.json({ success: false, message: 'Address is required' }, { status: 400 });
        }

        // Get cart items
        const [cartItems] = await pool.query(
            `SELECT ci.product_id, ci.quantity, p.offer_price
             FROM cart_items ci
             JOIN products p ON ci.product_id = p.id
             WHERE ci.user_id = ?`,
            [decoded.userId]
        );

        if (cartItems.length === 0) {
            return NextResponse.json({ success: false, message: 'Cart is empty' }, { status: 400 });
        }

        // Calculate total amount
        let amount = 0;
        cartItems.forEach(item => {
            amount += parseFloat(item.offer_price) * item.quantity;
        });
        // Add 2% tax
        const tax = Math.floor(amount * 0.02 * 100) / 100;
        amount = Math.floor((amount + tax) * 100) / 100;

        // Create order
        const [orderResult] = await pool.query(
            'INSERT INTO orders (user_id, address_id, amount, status, payment_method) VALUES (?, ?, ?, ?, ?)',
            [decoded.userId, addressId, amount, 'Order Placed', 'COD']
        );

        const orderId = orderResult.insertId;

        // Insert order items
        for (const item of cartItems) {
            await pool.query(
                'INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)',
                [orderId, item.product_id, item.quantity]
            );
        }

        // Clear cart
        await pool.query('DELETE FROM cart_items WHERE user_id = ?', [decoded.userId]);

        return NextResponse.json({ success: true, message: 'Order placed successfully', orderId });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
