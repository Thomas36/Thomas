// app/api/theaters/route.ts

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Db, MongoClient } from 'mongodb';

/**
 * @swagger
 * /api/theaters:
 *   get:
 *     summary: Get all theaters
 *     description: Retrieve a list of all theaters and cinemas
 *     responses:
 *       200:
 *         description: List of theaters retrieved successfully
 *       500:
 *         description: Internal server error
 */

export async function GET(): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    
    // Limiter à 20 théâtres pour éviter de surcharger la réponse
    const theaters = await db.collection('theaters')
      .find({})
      .limit(20)
      .toArray();
    
    return NextResponse.json({ status: 200, data: { theaters } });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
}

/**
 * @swagger
 * /api/theaters:
 *   post:
 *     summary: Method Not Allowed
 *     description: POST method is not supported on this endpoint
 *     responses:
 *       405:
 *         description: Method Not Allowed
 */

export async function POST(): Promise<NextResponse> {
  return NextResponse.json({ status: 405, message: 'Method Not Allowed', error: 'POST method is not supported on this endpoint' });
}

/**
 * @swagger
 * /api/theaters:
 *   put:
 *     summary: Method Not Allowed
 *     description: PUT method is not supported on this endpoint
 *     responses:
 *       405:
 *         description: Method Not Allowed
 */

export async function PUT(): Promise<NextResponse> {
  return NextResponse.json({ status: 405, message: 'Method Not Allowed', error: 'PUT method is not supported on this endpoint' });
}

/**
 * @swagger
 * /api/theaters:
 *   delete:
 *     summary: Method Not Allowed
 *     description: DELETE method is not supported on this endpoint
 *     responses:
 *       405:
 *         description: Method Not Allowed
 */

export async function DELETE(): Promise<NextResponse> {
  return NextResponse.json({ status: 405, message: 'Method Not Allowed', error: 'DELETE method is not supported on this endpoint' });
}