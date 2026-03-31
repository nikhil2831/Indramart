import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET single product by ID
export async function GET(request, { params }) {
    try {
        const { id } = await params;

        const [products] = await pool.query(`
            SELECT p.*, GROUP_CONCAT(pi.image_url ORDER BY pi.sort_order) as images
            FROM products p
            LEFT JOIN product_images pi ON p.id = pi.product_id
            WHERE p.id = ?
            GROUP BY p.id
        `, [id]);

        if (products.length === 0) {
            return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
        }

        const p = products[0];
        const product = {
            _id: String(p.id),
            userId: String(p.user_id),
            name: p.name,
            description: p.description,
            price: parseFloat(p.price),
            offerPrice: parseFloat(p.offer_price),
            image: p.images ? p.images.split(',') : [],
            category: p.category,
            date: new Date(p.created_at).getTime(),
        };

        return NextResponse.json({ success: true, product });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
