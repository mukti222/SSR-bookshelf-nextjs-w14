import { PrismaClient } from '@prisma/client';
// import upload from '../../../utils/multer';
import jwt from 'jsonwebtoken';
require('dotenv').config();

const prisma = new PrismaClient();


function authenticateTokenMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader 
  // && authHeader.split(" ")[1]; // biar token yg asli ga dirubah2
  if (token == null) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = user.userId;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(403).json({ message: 'Forbidden' });
  }
}

export default async function handler(req, res) {
  const { method, body, query: { id } } = req;

  console.log('Received request:', method, req.url);

  switch (method) {
    //implementasi : GET http://localhost:3000/api/books
    case 'GET':
    try {
      console.log('Processing GET request');

      // authenticateTokenMiddleware(req, res, async () => {
        // Lanjutkan dengan pemrosesan GET setelah otentikasi berhasil
        if (id) {
          const book = await prisma.book.findUnique({
            where: { id: parseInt(id) },
          });

          if (!book) {
            res.status(404).json({ message: 'Book not found' });
          } else {
            res.json({ book });
          }
        } else {
          const books = await prisma.book.findMany();
          res.json({ books });
        }
      
      // });

    } catch (error) {
      console.error("Error fetching books:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
    break;

      //implementasi : DELETE http://localhost:3000/api/books?id=1
    case 'DELETE':
      try {
        
      authenticateTokenMiddleware(req, res, async () => {
        console.log('Processing DELETE request');

        if (!id) {
          res.status(400).json({ message: 'ID parameter is required for DELETE request' });
          return;
        }

        const deletedBook = await prisma.book.delete({
          where: { id: parseInt(id) },
        });

        if (!deletedBook) {
          res.status(404).json({ message: 'Book not found' });
        } else {
          res.json({ message: 'Book deleted successfully', deletedBook });
        }
      })
      } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
      break;

      //implementasi : PUT http://localhost:3000/api/books?id=1
    case 'PUT':
      try {
        authenticateTokenMiddleware(req, res, async () => {
        console.log('Processing PUT request');

        if (!id) {
          res.status(400).json({ message: 'ID parameter is required for PUT request' });
          return;
        }

        const existingBook = await prisma.book.findUnique({
          where: { id: parseInt(id) },
        });

        if (!existingBook) {
          res.status(404).json({ message: 'Book not found' });
        } else {
          const updatedBook = await prisma.book.update({
            where: { id: parseInt(id) },
            data: { ...existingBook, ...body },
          });

          res.json({ message: 'Book updated successfully', updatedBook });
        }
      })
      } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
      break;

    default:
      console.log('Invalid method:', method);
      res.status(405).end(); // Method Not Allowed
      break;
  }
}
