// app/api/movies/[idMovie]/comments/[idComment]/route.ts

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Db, MongoClient, ObjectId } from 'mongodb';

/**
 * @swagger
 * /api/movies/{idMovie}/comments/{idComment}:
 *   get:
 *     summary: Get a specific comment for a movie
 *     description: Retrieve a single comment by its ID for a specific movie
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the movie
 *       - in: path
 *         name: idComment
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the comment
 *     responses:
 *       200:
 *         description: Comment retrieved successfully
 *       400:
 *         description: Invalid movie ID or comment ID
 *       404:
 *         description: Movie or comment not found
 *       500:
 *         description: Internal server error
 */

export async function GET( request: Request,{ params }: { params: any }): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    
    const { idMovie, idComment } = params;
    
    if (!ObjectId.isValid(idMovie) || !ObjectId.isValid(idComment)) {return NextResponse.json({ status: 400, message: 'Invalid ID format', 
        error: 'Movie ID or Comment ID format is incorrect' });
    }
    
    const movie = await db.collection('movies').findOne({ _id: new ObjectId(idMovie) });
    
    if (!movie) { return NextResponse.json({ status: 404, message: 'Movie not found', error: 'No movie found with the given ID' });
    }
    
    const comment = await db.collection('comments').findOne({ _id: new ObjectId(idComment),movie_id: new ObjectId(idMovie)});
    
    if (!comment) {return NextResponse.json({ status: 404, message: 'Comment not found', error: 'No comment found with the given ID for this movie' });
    }
    
    return NextResponse.json({ status: 200, data: { comment } });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
}

/**
 * @swagger
 * /api/movies/{idMovie}/comments/{idComment}:
 *   post:
 *     summary: Create a new comment for a movie
 *     description: Add a new comment to a specific movie
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the movie
 *       - in: path
 *         name: idComment
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId for the new comment (can be any valid ObjectId)
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Invalid movie ID
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Internal server error
 */

export async function POST(request: Request,{ params }: { params: any }): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    
    const { idMovie } = params;
    
    if (!ObjectId.isValid(idMovie)) {return NextResponse.json({ status: 400, message: 'Invalid movie ID', error: 'ID format is incorrect' });
    }
    
    const movie = await db.collection('movies').findOne({ _id: new ObjectId(idMovie) });
    
    if (!movie) {
      return NextResponse.json({ status: 404, message: 'Movie not found', error: 'No movie found with the given ID' });
    }
    
    const mockUserId = new ObjectId();
    
    const newComment = {
      name: "User Comment",
      email: "user@example.com",
      movie_id: new ObjectId(idMovie),
      text: "This is a sample comment added via API",
      date: new Date(),
      user_id: mockUserId
    };
    
    const result = await db.collection('comments').insertOne(newComment);
    
    return NextResponse.json({ status: 201, message: 'Comment created successfully', data: { insertedId: result.insertedId,comment: newComment } });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
}

/**
 * @swagger
 * /api/movies/{idMovie}/comments/{idComment}:
 *   put:
 *     summary: Update a specific comment
 *     description: Update a comment by its ID for a specific movie
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the movie
 *       - in: path
 *         name: idComment
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the comment
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       400:
 *         description: Invalid movie ID or comment ID
 *       404:
 *         description: Movie or comment not found
 *       500:
 *         description: Internal server error
 */

export async function PUT(request: Request,{ params }: { params: any }): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    
    const { idMovie, idComment } = params;
    
    if (!ObjectId.isValid(idMovie) || !ObjectId.isValid(idComment)) {return NextResponse.json({ status: 400, message: 'Invalid ID format', 
        error: 'Movie ID or Comment ID format is incorrect' });
    }
    
    const movie = await db.collection('movies').findOne({ _id: new ObjectId(idMovie) });
    
    if (!movie) {return NextResponse.json({ status: 404, message: 'Movie not found', error: 'No movie found with the given ID' });
    }
    
    const commentExists = await db.collection('comments').findOne({ _id: new ObjectId(idComment),movie_id: new ObjectId(idMovie)});
    
    if (!commentExists) {return NextResponse.json({ status: 404, message: 'Comment not found', error: 'No comment found with the given ID for this movie' });
    }
    
    const updatedComment = {text: "This comment has been updated via API",date: new Date()
    };
    
    const result = await db.collection('comments').updateOne(
      { _id: new ObjectId(idComment),movie_id: new ObjectId(idMovie)},{ $set: updatedComment }
    );
    
    return NextResponse.json({ status: 200, message: 'Comment updated successfully',data: { modifiedCount: result.modifiedCount }
    });
  } catch (error: any) {return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
}

/**
 * @swagger
 * /api/movies/{idMovie}/comments/{idComment}:
 *   delete:
 *     summary: Delete a specific comment
 *     description: Delete a comment by its ID for a specific movie
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the movie
 *       - in: path
 *         name: idComment
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the comment
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       400:
 *         description: Invalid movie ID or comment ID
 *       404:
 *         description: Movie or comment not found
 *       500:
 *         description: Internal server error
 */

export async function DELETE(request: Request,{ params }: { params: any }): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    
    const { idMovie, idComment } = params;
    
    if (!ObjectId.isValid(idMovie) || !ObjectId.isValid(idComment)) {return NextResponse.json({ status: 400, message: 'Invalid ID format', 
        error: 'Movie ID or Comment ID format is incorrect' });
    }
    
    const movie = await db.collection('movies').findOne({ _id: new ObjectId(idMovie) });
    
    if (!movie) {
      return NextResponse.json({ status: 404, message: 'Movie not found', error: 'No movie found with the given ID' });
    }
    
    const result = await db.collection('comments').deleteOne({ _id: new ObjectId(idComment),movie_id: new ObjectId(idMovie)});
    
    if (result.deletedCount === 0) {
        return NextResponse.json({ status: 404, message: 'Comment not found', error: 'No comment found with the given ID for this movie' });
    }
    
    return NextResponse.json({ status: 200, message: 'Comment deleted successfully',data: { deletedCount: result.deletedCount }});
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
}