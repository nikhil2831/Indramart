import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyToken } from '@/lib/auth';

// GET seller's products
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

        const [products] = await pool.query(`
            SELECT p.*, GROUP_CONCAT(pi.image_url ORDER BY pi.sort_order) as images
            FROM products p
            LEFT JOIN product_images pi ON p.id = pi.product_id
            WHERE p.user_id = ?
            GROUP BY p.id
            ORDER BY p.created_at DESC
        `, [decoded.userId]);

        const formattedProducts = products.map(p => ({
            _id: String(p.id),
            userId: String(p.user_id),
            name: p.name,
            description: p.description,
            price: parseFloat(p.price),
            offerPrice: parseFloat(p.offer_price),
            image: p.images ? p.images.split(',') : [],
            category: p.category,
            date: new Date(p.created_at).getTime(),
        }));

        return NextResponse.json({ success: true, products: formattedProducts });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
