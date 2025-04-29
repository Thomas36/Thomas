// app/api/theaters/[idTheater]/route.ts

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Db, MongoClient, ObjectId } from 'mongodb';

/**
 * @swagger
 * /api/theaters/{idTheater}:
 *   get:
 *     summary: Get a theater by ID
 *     description: Retrieve a single theater by its MongoDB ObjectId
 *     parameters:
 *       - in: path
 *         name: idTheater
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the theater
 *     responses:
 *       200:
 *         description: Theater found
 *       400:
 *         description: Invalid theater ID
 *       404:
 *         description: Theater not found
 *       500:
 *         description: Internal server error
 */

export async function GET(request: Request,{ params }: { params: any }): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    
    const { idTheater } = params;
    
    if (!ObjectId.isValid(idTheater)) {
      return NextResponse.json({ status: 400, message: 'Invalid theater ID', error: 'ID format is incorrect' });
    }
    
    const theater = await db.collection('theaters').findOne({ _id: new ObjectId(idTheater) });
    
    if (!theater) {
      return NextResponse.json({ status: 404, message: 'Theater not found', error: 'No theater found with the given ID' });
    }
    
    return NextResponse.json({ status: 200, data: { theater } });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
}

/**
 * @swagger
 * /api/theaters/{idTheater}:
 *   post:
 *     summary: Create a new theater
 *     description: Add a new theater to the collection
 *     parameters:
 *       - in: path
 *         name: idTheater
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId for the new theater (can be any valid ObjectId)
 *     responses:
 *       201:
 *         description: Theater created successfully
 *       500:
 *         description: Internal server error
 */

export async function POST(request: Request,{ params }: { params: any }): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    
    const newTheater = {
      theaterId: 1000,
      location: {
        address: {
          street1: "123 New Theater Street",
          city: "New York",
          state: "NY",
          zipcode: "10001"
        },
        geo: {
          type: "Point",
          coordinates: [-73.9857, 40.7484]
        }
      }
    };
    
    const result = await db.collection('theaters').insertOne(newTheater);
    
    return NextResponse.json({ status: 201, message: 'Theater created successfully', data: { insertedId: result.insertedId, theater: newTheater} });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
}

/**
 * @swagger
 * /api/theaters/{idTheater}:
 *   put:
 *     summary: Update a theater
 *     description: Update a theater by its ID
 *     parameters:
 *       - in: path
 *         name: idTheater
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the theater
 *     responses:
 *       200:
 *         description: Theater updated successfully
 *       400:
 *         description: Invalid theater ID
 *       404:
 *         description: Theater not found
 *       500:
 *         description: Internal server error
 */

export async function PUT(request: Request,{ params }: { params: { idTheater: string } }): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    
    const { idTheater } = params;
    
    if (!ObjectId.isValid(idTheater)) {
      return NextResponse.json({ status: 400, message: 'Invalid theater ID', error: 'ID format is incorrect' });
    }
    
    const theaterExists = await db.collection('theaters').findOne({ _id: new ObjectId(idTheater) });
    
    if (!theaterExists) {
      return NextResponse.json({ status: 404, message: 'Theater not found', error: 'No theater found with the given ID' });
    }
    
    const updatedTheater = {
      "location.address.street1": "456 Updated Theater Avenue",
      "location.address.city": "Los Angeles",
      "location.address.state": "CA",
      "location.address.zipcode": "90001"
    };
    
    const result = await db.collection('theaters').updateOne(
      { _id: new ObjectId(idTheater) },
      { $set: updatedTheater }
    );
    
    return NextResponse.json({ status: 200, message: 'Theater updated successfully',data: { modifiedCount: result.modifiedCount }});
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
}

/**
 * @swagger
 * /api/theaters/{idTheater}:
 *   delete:
 *     summary: Delete a theater
 *     description: Delete a theater by its ID
 *     parameters:
 *       - in: path
 *         name: idTheater
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the theater
 *     responses:
 *       200:
 *         description: Theater deleted successfully
 *       400:
 *         description: Invalid theater ID
 *       404:
 *         description: Theater not found
 *       500:
 *         description: Internal server error
 */

export async function DELETE(request: Request,{ params }: { params: any }): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    
    const { idTheater } = params;
    
    if (!ObjectId.isValid(idTheater)) {
      return NextResponse.json({ status: 400, message: 'Invalid theater ID', error: 'ID format is incorrect' });
    }
    
    const result = await db.collection('theaters').deleteOne({ _id: new ObjectId(idTheater) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ status: 404, message: 'Theater not found', error: 'No theater found with the given ID' });
    }
    
    return NextResponse.json({ status: 200, message: 'Theater deleted successfully',data: { deletedCount: result.deletedCount }});
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
}