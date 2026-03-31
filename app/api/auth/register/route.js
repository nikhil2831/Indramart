import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/lib/auth';

export async function POST(request) {
    try {
        const { name, email, password, role } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400 });
        }

        // Check if user exists
        const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            return NextResponse.json({ success: false, message: 'Email already registered' }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        const [result] = await pool.query(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, role || 'user']
        );

        const token = generateToken(result.insertId);

        return NextResponse.json({
            success: true,
            token,
            user: { id: result.insertId, name, email, role: role || 'user' }
        });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
