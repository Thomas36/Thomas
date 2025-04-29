// app/api/movies/[idMovie]/comments/route.ts

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Db, MongoClient, ObjectId } from 'mongodb';

/**
 * @swagger
 * /api/movies/{idMovie}/comments:
 *   get:
 *     summary: Get all comments for a specific movie
 *     description: Retrieve all comments associated with a movie by its ID
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the movie
 *     responses:
 *       200:
 *         description: List of comments retrieved successfully
 *       400:
 *         description: Invalid movie ID
 *       404:
 *         description: Movie not found or no comments available
 *       500:
 *         description: Internal server error
 */

export async function GET( request: Request, { params }: { params: any }): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    
    const { idMovie } = params;
    if (!ObjectId.isValid(idMovie)) { return NextResponse.json({ status: 400, message: 'Invalid movie ID', error: 'ID format is incorrect' });
    }
    
    const movie = await db.collection('movies').findOne({ _id: new ObjectId(idMovie) });
    
    if (!movie) {
      return NextResponse.json({ status: 404, message: 'Movie not found', error: 'No movie found with the given ID' });
    }
    
    const comments = await db.collection('comments').find({ movie_id: new ObjectId(idMovie) }).toArray();
    
    return NextResponse.json({ status: 200, data: { comments } });
  } catch (error: any) { 
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
}