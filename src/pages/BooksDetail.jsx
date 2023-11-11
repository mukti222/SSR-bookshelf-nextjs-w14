import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Skeleton,
  HStack,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';

function BooksDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/books?id=${id}`);
        const data = await response.json();
        setBook(data.book);
      } catch (error) {
        console.error('Error fetching book:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/books?id=${id}`, {
        method: 'DELETE',
        headers: {
          'authorization': `${token}`,
        },
      });

      if (response.ok) {
        setDeleteModalOpen(true);
      } else {
        console.error('Failed to delete book:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    //ke halaman "/" setelah modal ditutup
    window.location.href = '/';
  };

  return (
    <Box border="2px" borderColor="black" p="4" rounded="2xl" backgroundColor="whiteAlpha.500" shadow="2xl">
      {isLoading ? (
        <Skeleton height="300px" my="7" />
      ) : (
        <Flex my="6">
          <Box w="300px">
            <Image src={`/uploads/${book.image}`} alt={book.title} />
          </Box>
          <Box ml="8">
            <Heading as="h1" size="lg">
              {book.title}
            </Heading>
            <Text fontSize="xl" fontWeight="semibold" color="gray.500">
              Author: {book.author}
            </Text>
            <Text fontSize="xl" fontWeight="semibold" color="gray.500">
              Publisher: {book.publisher}
            </Text>
            <Text fontSize="xl" fontWeight="semibold" color="gray.500">
              Year: {book.year}
            </Text>
            <Text fontSize="xl" fontWeight="semibold" color="gray.500" mb="4">
              Page: {book.pages} pages
            </Text>
          </Box>
        </Flex>
      )}
      {localStorage.getItem('token') && (
        <HStack>
          <Popover>
            <PopoverTrigger>
              <Button colorScheme="red">Delete</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Confirmation!</PopoverHeader>
              <PopoverBody>Are you sure you want to delete this book?</PopoverBody>
              <Button onClick={handleDelete} colorScheme="red">
                Delete
              </Button>
            </PopoverContent>
          </Popover>
          <Link to={`/editbook/${id}`}>
            <Button>Edit</Button>
          </Link>
        </HStack>
      )}

      {/* Delete Success Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Book Deleted Successfully</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>The book has been successfully deleted.</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleCloseDeleteModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default BooksDetail;
