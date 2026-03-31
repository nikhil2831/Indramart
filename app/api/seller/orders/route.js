import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyToken } from '@/lib/auth';

// GET orders for seller's products
export async function GET(request) {
    try {
        const decoded = verifyToken(request);
        if (!decoded) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        // Verify seller role
        const [users] = await pool.query('SELECT role FROM users WHERE id = ?', [decoded.userId]);
        if (users.length === 0 || users[0].role !== 'seller') {
            return NextResponse.json({ success: false, message: 'Seller access required' }, { status: 403 });
        }

        // Get orders that contain this seller's products
        const [orders] = await pool.query(
            `SELECT DISTINCT o.*, a.full_name, a.phone_number, a.pincode, a.area, a.city, a.state
             FROM orders o
             JOIN order_items oi ON o.id = oi.order_id
             JOIN products p ON oi.product_id = p.id
             JOIN addresses a ON o.address_id = a.id
             WHERE p.user_id = ?
             ORDER BY o.created_at DESC`,
            [decoded.userId]
        );

        const formattedOrders = [];
        for (const order of orders) {
            const [items] = await pool.query(
                `SELECT oi.quantity, p.id as product_id, p.name, p.description, p.price, p.offer_price, p.category,
                        GROUP_CONCAT(pi.image_url ORDER BY pi.sort_order) as images
                 FROM order_items oi
                 JOIN products p ON oi.product_id = p.id
                 LEFT JOIN product_images pi ON p.id = pi.product_id
                 WHERE oi.order_id = ? AND p.user_id = ?
                 GROUP BY oi.id, p.id`,
                [order.id, decoded.userId]
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
