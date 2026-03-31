import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// GET all products (public)
export async function GET() {
    try {
        const [products] = await pool.query(`
            SELECT p.*, GROUP_CONCAT(pi.image_url ORDER BY pi.sort_order) as images
            FROM products p
            LEFT JOIN product_images pi ON p.id = pi.product_id
            GROUP BY p.id
            ORDER BY p.created_at DESC
        `);

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

// POST add product (seller only)
export async function POST(request) {
    try {
        const decoded = verifyToken(request);
        if (!decoded) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        // Check if user is a seller
        const [users] = await pool.query('SELECT role FROM users WHERE id = ?', [decoded.userId]);
        if (users.length === 0 || users[0].role !== 'seller') {
            return NextResponse.json({ success: false, message: 'Only sellers can add products' }, { status: 403 });
        }

        const formData = await request.formData();
        const name = formData.get('name');
        const description = formData.get('description');
        const price = parseFloat(formData.get('price'));
        const offerPrice = parseFloat(formData.get('offerPrice'));
        const category = formData.get('category');

        // Insert product
        const [result] = await pool.query(
            'INSERT INTO products (user_id, name, description, price, offer_price, category) VALUES (?, ?, ?, ?, ?, ?)',
            [decoded.userId, name, description, price, offerPrice, category]
        );

        const productId = result.insertId;

        // Handle image uploads
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        await mkdir(uploadDir, { recursive: true });

        for (let i = 0; i < 4; i++) {
            const file = formData.get(`image${i}`);
            if (file && file.size > 0) {
                const bytes = await file.arrayBuffer();
                const buffer = Buffer.from(bytes);
                const filename = `${Date.now()}_${i}_${file.name}`;
                const filepath = path.join(uploadDir, filename);
                await writeFile(filepath, buffer);

                const imageUrl = `/uploads/${filename}`;
                await pool.query(
                    'INSERT INTO product_images (product_id, image_url, sort_order) VALUES (?, ?, ?)',
                    [productId, imageUrl, i]
                );
            }
        }

        return NextResponse.json({ success: true, message: 'Product added successfully', productId });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
