import { VStack, SimpleGrid, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Books from "../components/Books";

// import { getAllBooks } from "../api/books"; // Menggunakan path yang benar untuk mengambil data dari API
// import backgroundImage from './1.jpg';
import axios from 'axios';


export const getAllBooks = async () => {
  try {
    const response = await axios.get('/api/books'); // Menggunakan path yang sesuai dengan struktur API routes di Next.js
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export default function Homepage() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getAllBooks();
      setBooks(books);
    };
    fetchBooks();
  }, []);

  return (

      <VStack w="100%" 
      bgGradient="linear(to-b, white, rgb(179, 255, 244))">
        <SimpleGrid columns={3} spacing={4} mb={10} gap={12}>
          {books?.books?.map((book) => (
            <Books key={`${book.id} ${book.title}`} {...book} />
          ))}
        </SimpleGrid>
      </VStack>
    
  );
}
