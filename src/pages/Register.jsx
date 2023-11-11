import { useState } from 'react';
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //hit API register
  const handleRegister = async () => {
    try {
      const response = await axios.post('/api/auth/register', formData);
      toast({
        title: 'Success',
        description: 'Registration successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to register. User may already exist.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          name="name"
          placeholder="Enter your name"
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          name="email"
          placeholder="Enter your email address"
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={handleInputChange}
        />
      </FormControl>
      <Button colorScheme="blue" onClick={handleRegister}>
        Register
      </Button>
    </VStack>
  );
};

export default Register;
