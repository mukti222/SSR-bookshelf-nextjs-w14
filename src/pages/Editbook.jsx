import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
} from '@chakra-ui/react';

function Editbook() {
  const { id } = useParams();
  const [book, setBook] = useState({
    title: '',
    author: '',
    publisher: '',
    year: '',
    pages: '',
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editSuccess, setEditSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/books?id=${id}`);
        const data = await response.json();
        setBook(data.book);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/books?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(book),
      });

      if (response.ok) {
        setEditSuccess(true);
        onOpen();
      } else {
        console.error('Failed to update book:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleCloseModal = () => {
    onClose();
    setEditSuccess(false);
  };

  return (
    <Box p="8">
      <Heading as="h2" size="xl" mb="6">
        Edit Book
      </Heading>
      <Flex direction="column" maxW="md">
        <FormControl mb="4">
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            name="title"
            value={book.title}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Author</FormLabel>
          <Input
            type="text"
            name="author"
            value={book.author}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Publisher</FormLabel>
          <Input
            type="text"
            name="publisher"
            value={book.publisher}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Year</FormLabel>
          <Input
            type="text"
            name="year"
            value={book.year}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Pages</FormLabel>
          <Input
            type="text"
            name="pages"
            value={book.pages}
            onChange={handleInputChange}
          />
        </FormControl>
        <Button colorScheme="blue" onClick={handleUpdate}>
          Update Book
        </Button>
      </Flex>

      {/* Edit Success Modal */}
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Successful</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Your book has been successfully updated.</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleCloseModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Editbook;
