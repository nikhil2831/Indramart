import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyToken } from '@/lib/auth';

// GET user addresses
export async function GET(request) {
    try {
        const decoded = verifyToken(request);
        if (!decoded) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const [addresses] = await pool.query(
            'SELECT * FROM addresses WHERE user_id = ?',
            [decoded.userId]
        );

        const formattedAddresses = addresses.map(addr => ({
            _id: String(addr.id),
            userId: String(addr.user_id),
            fullName: addr.full_name,
            phoneNumber: addr.phone_number,
            pincode: addr.pincode,
            area: addr.area,
            city: addr.city,
            state: addr.state,
        }));

        return NextResponse.json({ success: true, addresses: formattedAddresses });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

// POST add new address
export async function POST(request) {
    try {
        const decoded = verifyToken(request);
        if (!decoded) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { fullName, phoneNumber, pincode, area, city, state } = await request.json();

        if (!fullName || !phoneNumber || !pincode || !area || !city || !state) {
            return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400 });
        }

        const [result] = await pool.query(
            'INSERT INTO addresses (user_id, full_name, phone_number, pincode, area, city, state) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [decoded.userId, fullName, phoneNumber, pincode, area, city, state]
        );

        return NextResponse.json({
            success: true,
            message: 'Address added successfully',
            address: {
                _id: String(result.insertId),
                userId: String(decoded.userId),
                fullName, phoneNumber, pincode, area, city, state
            }
        });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
